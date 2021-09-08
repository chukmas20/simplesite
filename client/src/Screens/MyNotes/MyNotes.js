import {useEffect} from 'react'
import { Accordion, Badge, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MainScreen from '../../components/MainScreen'
import {useDispatch, useSelector} from "react-redux";
import { deleteNoteAction, listNotes } from '../../actions/notesActions';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useHistory } from 'react-router';



const MyNotes = ({search}) => {
    const history = useHistory();
    const dispatch = useDispatch()
    const noteList = useSelector(state=> state.noteList);
    const {loading, notes, error} = noteList;

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin;

    const noteCreate = useSelector((state) => state.noteCreate);
    const { success: SuccessCreate } = noteCreate;

    const noteUpdate = useSelector((state) => state.noteUpdate);
    const { success:successUpdate } = noteUpdate;

    const noteDelete = useSelector(state => state.noteDelete)
    const {loading:loadingDelete, error:errorDelete, success:successDelete} = noteDelete;



    const deleteHandler =(id)=>{
        if(window.confirm("Are You Sure?")){
          dispatch(deleteNoteAction(id))
        }
    };


    useEffect(() => {
        dispatch(listNotes());
        if(!userInfo){
            history.push("/")
        }
    }, [dispatch, SuccessCreate, history,userInfo, successUpdate, successDelete]);
    return (
        <div>
             <MainScreen title= {`Welcome ${userInfo.name}`}>
                      <Link to="createnote">
                        <Button size="lg" style={{marginLeft:10, marginBottom:6}}>
                             Create New Note 
                            </Button>
                        </Link>
                         {errorDelete && (
                            <ErrorMessage variant="danger">{errorDelete} </ErrorMessage>  
                         )}
                         {loadingDelete && <Loading />}
                         {error && <ErrorMessage variant="danger">{error} </ErrorMessage>}
                         {loading &&  < Loading />}
                             {
                                 notes?.reverse().filter((filterNote)=>
                                 filterNote.title.toLowerCase().includes(search.toLowerCase())
                                 ).map(note=>(
                            <Accordion key={note._id}>
                                  <Card style={{margin:10}}>
                           <Card.Header style={{display:'flex'}}>
                               <span
                                style={{
                                    color:"black",
                                    textDecoration:"none",
                                    flex:1,
                                    cursor:"pointer",
                                    alignSelf:"center",
                                    fontSize:18,
                                }}
                               >
                                   <Accordion.Toggle as = {Card.text} variant="link" eventKey="0">
                                      {note.title}
                                   </Accordion.Toggle>
                             </span>
                               <div>
                               <Button href={`/note/${note._id}`}> Edit </Button>
                               <Button variant="danger" className="mx-2" onClick={()=> deleteHandler(note._id)}>
                                    DELETE
                                </Button>
                           </div>
                           </Card.Header>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body>
                            <h4>
                                <Badge variant="success">
                                    Category - {note.category}
                                </Badge>
                            </h4>
                           <blockquote className="blockquote mb-0">
                            <p>
                               {note.content}
                            </p>
                            <footer className="blockquote-footer">
                                Create on{" "}
                                <cite title="Source title">
                                   {note.createdAt.substring(0,10)}
                                </cite>
                            </footer>
                       </blockquote>
                          </Card.Body>
                            </Accordion.Collapse>
                                    
                      </Card>
                 </Accordion>          
                          
                  ))
                }

            </MainScreen>
        </div>
    )
}

export default MyNotes

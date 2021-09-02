import {useEffect, useState} from 'react'
import { Accordion, Badge, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MainScreen from '../../components/MainScreen'
import axios from "axios";

const MyNotes = () => {
    const [notes, setNotes] = useState([]);
    const deleteHandler =(id)=>{
        if(window.confirm("Are You Sure?")){

        }
    };

    const fetchNotes = async()=>{
        const {data} = await axios.get("/api/notes");
        setNotes(data);
    };
    console.log(notes);

    useEffect(() => {
       fetchNotes();
    }, [])
    return (
        <div>
             <MainScreen title="Welcome Back Chukmas">
                      <Link to="create">
                        <Button size="lg" style={{marginLeft:10, marginBottom:6}}>
                             Create New Note 
                             </Button>
                        </Link>
                             {
                                 notes.map(note=>(
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
                                Date created
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

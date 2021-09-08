import { Form, Button } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import {useState, useEffect} from "react";
import "./RegisterPage.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import {useHistory} from "react-router-dom";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";


const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pic, setPic] = useState(
        "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/72/276584/1.jpg?6225"
        );
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [picMessage, setPicMessage] = useState(null);
     const dispatch = useDispatch();
     const userRegister = useSelector(state=> state.userRegister);
     const {loading, error, userInfo} = userRegister;
     const history = useHistory();
    // const [error, setError] = useState(false);
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
      if(userInfo){
        history.push("/mynotes") 
      }
    }, [history, userInfo]);

    const submitHandler = async(e)=>{
        e.preventDefault();
        if(password !== password){
           setMessage("Password does not match");
        }else{
          dispatch(register(name, email, password, pic));
        }  
    }

    const postDetails = (pics) =>{
         if(!pics){
             return setPicMessage("Please Select an Image");
         }
         setPicMessage(null);
         if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "simplesite");
            data.append("cloud_name", "chukmas");
            fetch("https://api.cloudinary.com/v1_1/chukmas/image/upload", {
              method: "post",
              body: data,
            })
              .then((res) => res.json())
              .then((data) => {
                  console.log(data)
                setPic(data.url.toString());
              })
              .catch((err) => {
                console.log(err);
              });
         }else{
            return setPicMessage("Please select an Image");
       }        
    }

    return (
        <MainScreen title="REGISTER">
         {error &&  <ErrorMessage variant="danger"> {error} </ErrorMessage>}
        {message &&  <ErrorMessage variant="danger"> {message} </ErrorMessage>}
        {loading && <Loading />}
        <div className="registerContainer">
            <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label> Name </Form.Label>
                    <Form.Control
                     type="name" 
                     placeholder="Enter Name"
                      value={name}
                      onChange={(e)=> setName(e.target.value)}
                     />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                     type="email"
                      placeholder="Enter email" 
                      value={email}
                      onChange={(e)=> setEmail(e.target.value)}
                      />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                     type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e)=> setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                     type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e)=> setConfirmPassword(e.target.value)}
                       />
                </Form.Group>
                {picMessage && (
                    <ErrorMessage variant="danger"> {picMessage} </ErrorMessage>
                )}
                <Form.Group className="mb-3" controlId="pic">
                    <Form.Label> Profile Picture</Form.Label>
                    <Form.File
                      onChange ={(e)=> postDetails(e.target.files[0])}
                      id="custom-file"
                      type="image/png"
                      label="Upload Profile Picture"
                      custom
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                </Form>
           </div>
        </MainScreen>
    )
}

export default RegisterPage;

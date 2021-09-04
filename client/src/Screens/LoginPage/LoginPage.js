import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import MainScreen from '../../components/MainScreen';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./LoginPage.css";
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { login } from '../../actions/userActions';
import { useHistory } from 'react-router';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //const [error, setError] = useState(false);
   // const [loading, setLoading] = useState(false);
    const  dispatch = useDispatch();
    const history = useHistory();

    const userLogin = useSelector((state) => state.userLogin);
    const {loading, error,userInfo} = userLogin;
   
    
    useEffect(() => {
        if (userInfo) {
          history.push("/mynotes");
        }
      }, [history, userInfo]);

    const submitHandler = async(e)=>{
        e.preventDefault();
        dispatch(login(email,password));
    }
    
    return (
        <MainScreen title="LOGIN">
            <div className="loginContainer">
            {error &&  <ErrorMessage variant="danger">Invalid Username or password </ErrorMessage>}
              {loading && <Loading />}  
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email"
                     placeholder="Enter email"
                      value={email}
                      onChange={(e)=> setEmail(e.target.value)}

                     />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                     placeholder="Password"
                     value={password}
                     onChange={(e)=> setPassword(e.target.value)}
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

export default LoginPage

import { useEffect } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./LandingPage.css";

const LandingPage = () => {

    // useEffect(()=>{
    //    const userInfo = localStorage.getItem("userInfo");
    //    if(userInfo){
    //        history.push("/mynotes");
    //    }
    // }, [history]);
    return (
        <div className="main">
            <Container>
                <Row>
                  <div className = "intro-text">
                        <div>
                            <h1 className="title"> Welcome</h1>
                            <p className="subtitle"> The safest App to take notes</p> 
                            <div className="buttonContainer">
                                <Link to="/login">
                                  <Button size="lg" className="landingbutton " > Login</Button>
                                </Link>
                            <Link to="/register">
                             <Button size="lg" className="landingbutton ml-5" variant="outline-primary">Sign up</Button>
                          </Link>
                    </div>
                </div>        
             </div>      
         </Row>
     </Container>
        </div>
    )
}

export default LandingPage

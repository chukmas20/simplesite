import React from 'react';
import {Nav, NavDropdown, Navbar, FormControl, Form, Button, Container} from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';
import "./Header.css"

const Header = ({setSearch}) => {

   const history = useHistory();
   const dispatch =  useDispatch();
   const userLogin = useSelector((state)=> state.userLogin)
   const {userInfo} = userLogin;

   const logoutHandler =()=>{
     dispatch(logout())
     history.push("/")
   }
    return (
    <div> 
    <Navbar bg="warning"  variant="dark" expand="lg" >
    <Container>
        <Navbar.Brand >
          <Link to="/">
            <div className="headerName">
              <span style={{padding:"10px"}}>N-NOTES APP </span>
            </div>
          </Link>
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
         <Nav className= "m-auto">
         <Form className="d-flex">
        <FormControl
            type="search"
            placeholder="Search"
            className="mr-2"
            aria-label="Search"
            onChange={(e)=> setSearch (e.target.value)}
        />
    </Form>
        </Nav>
    {userInfo ?  (<Nav>  
      <Nav.Link href="#action1" style={{fontWeight:"bold", fontSize:15,color:"white"}}>
        <Link to="mynotes">
           My Notes
         </Link>
        </Nav.Link>
      <NavDropdown title={userInfo?.name} style={{fontWeight:"bold", fontSize:18,color:"black"}} id="navbarScrollingDropdown" >
        <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
        <NavDropdown.Item onClick={
           logoutHandler
        }>
           Log out
        </NavDropdown.Item>
        <NavDropdown.Divider />
      </NavDropdown>
    </Nav> ): (
       <Nav>
          {" "}
           <Nav.Link>
                <Link to="/login" style={{fontWeight:"bold", color:"white"}}> Login </Link>
           </Nav.Link>
       </Nav>
       )
       }
  </Navbar.Collapse>
  </Container>
</Navbar> 
 </div>
    )
}

export default Header;
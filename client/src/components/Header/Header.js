import React from 'react';
import {Nav, NavDropdown, Navbar, FormControl, Form, Button, Container} from "react-bootstrap";
import { Link } from 'react-router-dom';

const Header = () => {
    return (
    <div>
        
    <Navbar bg="warning"  variant="dark" expand="lg" >
    <Container>
        <Navbar.Brand >
          <Link to="/">
            Navbar scroll
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
        />
      <Button variant="outline-dark">Search</Button>
    </Form>
         </Nav>
     <Nav
      
    >
      <Nav.Link href="#action1" style={{fontWeight:"bold", fontSize:15,color:"white"}}>
        <Link to="mynotes">
           My Notes
         </Link>
        </Nav.Link>
      <Nav.Link href="#action2" style={{fontWeight:"bold", fontSize:15,color:"white"}}>Link</Nav.Link>
      <NavDropdown title="My Notes"  style={{fontWeight:"bold", fontSize:18,color:"black"}} id="navbarScrollingDropdown" >
        <NavDropdown.Item href="/">My Profile</NavDropdown.Item>
        <NavDropdown.Item href="#action4">Log out</NavDropdown.Item>
        <NavDropdown.Divider />
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar> 
 </div>
    )
}

export default Header;

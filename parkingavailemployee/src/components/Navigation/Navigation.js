import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav';
import './Navigation.css';
import { LinkContainer } from 'react-router-bootstrap';

class Navigation extends React.Component {
    constructor (props) {
        super(props);
    
        this.state = {
            redirect: null

        }      
    }

    redirectToSignIn = () => {
        this.props.logout();
        window.location.href = '/parkingavailemployee'
    } 

   
    render(){
        return (
     
            <Navbar bg="medium"  fluid='true' className = 'barColor' >
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                
                    <Nav className='mr-auto ' >
                        <LinkContainer to='/parkingavailemployee/parkinglots'>
                            <Nav.Link className='linkText' ><span className='linkText'>Parking Lots</span></Nav.Link>
                        </LinkContainer>
                    </Nav>

                    <Nav className='ml-auto'>
                        <Nav.Link onClick = {this.redirectToSignIn}><span className='linkText'>Signout</span></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Navigation;
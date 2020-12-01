import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Redirect } from 'react-router-dom';
import './SignIn.css';

class SignIn extends React.Component {
   constructor (props) {
        super(props);
    
        this.state = {
            email: '',
            password: '',
            redirect: null,
            signInMessage: '' 

        }  
    }

    //On change attribute for email text box
    onEmailChange = (event) => {

        this.setState({email: event.target.value});            
    }

    //On password attribute for password text box
    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }
    
    onSubmitSignIn = (event) => {
        // Call/signin passing email address and password in the request body, POST, returns a user object.
        const postOptions = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        }

        fetch('/signincouch', postOptions)
            .then(response => response.json())
            .then(user =>{
                if (user._id) {
                    this.props.loadUser(user);
                    this.props.setSignIn(true);
                    this.setState({signInMessage:''})
                    this.redirectToParkingLots();
        
                }
                /* else {
                    this.props.setSignIn(false);
                    this.setState({signInMessage:'The user email and/or password is invalid'})
                } */  
            })
            .catch(err => {
                this.props.setSignIn(false);
                    this.setState({signInMessage:'The user email and/or password is invalid'})

            })

        


        /* const user = {
            id: 1,
            name: 'Bob',
            email: 'rocketman@gmail.com'
        }
        // const user = null;

        if (user) {
            this.props.loadUser(user);
            this.props.setSignIn(true);
            this.setState({signInMessage:''})
            this.redirectToParkingLots();

        }
        else {
            this.props.setSignIn(false);
            this.setState({signInMessage:'The user email and/or password is invalid'})
        } */
        
    }

    redirectToParkingLots = () => {            
        // Changing the value redirect         
        this.setState({ redirect: "/parkingavailemployee/parkinglots"});
    } 

    render () {
        if (this.state.redirect) {
            return  <Redirect to={{ pathname: this.state.redirect }}/>
        }

        return (
        
            <Container fluid style={{backgroundColor: '#D4F1F4'}}>
                <Row>
                <Col>
                    <Row>
                        <Col className= "mt-2" lg={12}>
                            <div className = "signInMessage">{this.state.signInMessage}</div>
                        </Col>
                    </Row>
                    <Row>
                    <Col xs ={7} md={4} lg={4} className = "mt-2 mb-3">                  
                                                        
                        <Form>
                            <Form.Group controlId="formBasicEmail">

                            <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange = {this.onEmailChange}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange = {this.onPasswordChange}/>
                            </Form.Group>
                            <Button variant="primary" onClick = {this.onSubmitSignIn}>Sign In</Button>
                        </Form>
                    </Col>
                    </Row>
                </Col>
                </Row>
                
            </Container>
        );

    }

}

export default SignIn ;

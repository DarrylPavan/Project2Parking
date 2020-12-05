import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Override from '../Override/Override';
import { Formik } from 'formik'; 
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';

class Availability extends React.Component {

    constructor(props) {
        super(props);

        this.state = {           
            parkingLotId: props.parkingLotId,
            activeOverrideField: '',
            capacity: 0,
            numOccupiedSpots: 0,
            numAvailableSpots: 0,
            validationMessage: '',
            confirmationButtonPressed: '',
            currentParkingLot: {
                _id: '',
                name: '',
                stallsOccupied: 0,
                capacity: 0
           },
        }
    }
    
    componentDidMount(props) {       
        console.log(`/parkinglotcouch?_id=${this.state.parkingLotId}`);
        fetch(`/parkinglotcouch?_id=${this.state.parkingLotId}`)
            .then(response => response.json())
            .then(currentParkingLot => {
                this.setState({ currentParkingLot: currentParkingLot, 
                    capacity: currentParkingLot.capacity, 
                    numAvailableSpots: currentParkingLot.capacity- currentParkingLot.stallsOccupied, 
                    numOccupiedSpots: currentParkingLot.stallsOccupied 
                });                    
            });
    
    }

    engageOverride = (activeOverrideField) =>{

        if (this.state.activeOverrideField === '') {
            this.setState({ activeOverrideField: activeOverrideField });
            //the else if is to reset back previous state
        } else if (this.state.activeOverrideField === activeOverrideField) {
            if (activeOverrideField === 'capacity')
            {
                this.setState({capacity: this.state.currentParkingLot.capacity});
            }
            else if (activeOverrideField === 'numOccupiedSpots') {
                this.setState({numOccupiedSpots: this.state.currentParkingLot.stallsOccupied });
            }
            else if (activeOverrideField === 'numAvailableSpots') {
                this.setState({numAvailableSpots: this.state.currentParkingLot.capacity- this.state.currentParkingLot.stallsOccupied});
            }


            this.setState({ activeOverrideField: ''});
        }
    }

    getOverrideButtonColor = (activeOverrideField) => {
        if (this.state.activeOverrideField === activeOverrideField)
        {
            return 'red';
        } else {
            return '#189AB4';
        }
    }

    getOverrideTextBoxColor = (activeOverrideField) => {
        if (this.state.activeOverrideField === activeOverrideField)
        {
            return 'white';
        } else {
            return 'lightgrey';
        }
    }

    getOverrideTextBoxReadOnly = (activeOverrideField) => {
        if (this.state.activeOverrideField === activeOverrideField)
        {
            //can only type if false
            return false;
        } else {
            return true;
        }
    }

    setStateValueForOverrideField = (event) => {
        console.log(event.target.id);
        if (event.target.id === 'capacity')
        {
            this.setState({capacity: event.target.value});
        }
        else if (event.target.id === 'numOccupiedSpots') {
            this.setState({numOccupiedSpots: event.target.value});
        }
        else if (event.target.id === 'numAvailableSpots') {
            this.setState({numAvailableSpots: event.target.value});
        }
    }

    saveParkingLotChanges = () => {

       // Call /saveParkingLot passing id by query string, and only field that changed in body, PATCH, returns currentParkingLot
        
       const body = {

       }
       if (this.state.activeOverrideField === 'capacity') {
           body.capacity = this.state.capacity;
       }

       else if (this.state.activeOverrideField === 'numOccupiedSpots') {
           body.stallsOccupied = this.state.numOccupiedSpots;
       }

       else if (this.state.activeOverrideField === 'numAvailableSpots') {
            body.stallsOccupied = this.state.capacity - this.state.numAvailableSpots;

       }


       const patchOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',            
            },

            body: JSON.stringify (body)
        }

        fetch(`/saveparkinglotcouch?_id=${this.state.parkingLotId}`,patchOptions)
            .then(response => response.json())
            .then(currentParkingLot => {
                console.log(currentParkingLot);
                this.setState({
                    currentParkingLot: currentParkingLot,
                    capacity: currentParkingLot.capacity, 
                    numOccupiedSpots: currentParkingLot.stallsOccupied,
                    numAvailableSpots: currentParkingLot.capacity - currentParkingLot.stallsOccupied }); 
            })
    
    }

    resetParkingLot = () => {
      //Call /resetParkingLot, passing in id by query string, PUT, returns updated parking lot object
        const putOptions = {
            method: 'PUT'           
        }

        fetch(`/resetparkinglotcouch?_id=${this.state.parkingLotId}`,putOptions)
            .then(response => response.json())
            .then(currentParkingLot => {
                this.setState({currentParkingLot: currentParkingLot,
                    capacity: currentParkingLot.capacity, 
                    numOccupiedSpots: currentParkingLot.stallsOccupied, 
                    numAvailableSpots: currentParkingLot.capacity-currentParkingLot.stallsOccupied,
                    activeOverrideField: ''});

            })
           
      
    }

    

    incrementNumAvailableSpots = () => {
        //Call /decrementstallsoccupied passing id in query string, PATCH, returns an updated parking lot object
        const patchOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            
        }
        fetch(`/decrementstallsoccupiedcouch?_id=${this.state.parkingLotId}`,patchOptions)
            .then(response => response.json())
            .then(currentParkingLot => {
                this.setState({ currentParkingLot: currentParkingLot, 
                    capacity: currentParkingLot.capacity,
                    numAvailableSpots: currentParkingLot.capacity - currentParkingLot.stallsOccupied, 
                    numOccupiedSpots: currentParkingLot.stallsOccupied });    
            })
             
    }

    decrementNumAvailableSpots = () => {
        //Call /incrementstallsoccupied passing id in query string, PATCH, returns an updated parking lot object
        const patchOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            
        }
        fetch(`/incrementstallsoccupiedcouch?_id=${this.state.parkingLotId}`,patchOptions)
            .then(response => response.json())
            .then(currentParkingLot => {
                this.setState({ currentParkingLot: currentParkingLot, 
                    capacity: currentParkingLot.capacity,
                    numAvailableSpots: currentParkingLot.capacity - currentParkingLot.stallsOccupied, 
                    numOccupiedSpots: currentParkingLot.stallsOccupied });    
            })        

    }

    setStateValueForOverrideFieldFromValues = (values) => {
       
        if (this.state.activeOverrideField === 'capacity')
        {
            this.setState({capacity: values.capacity});
        }
        else if (this.state.activeOverrideField === 'numOccupiedSpots') {
            this.setState({numOccupiedSpots: values.numOccupiedSpots});
        }
        else if (this.state.activeOverrideField === 'numAvailableSpots') {
            this.setState({numAvailableSpots: values.numAvailableSpots});
        }
    }

    setConfirmationButtonPressed = (confirmationButtonPressed) => {
        this.setState({confirmationButtonPressed: confirmationButtonPressed});
    }

    render() {

        const schema = yup.object({
            capacity: yup.number('Must enter only numbers')
            .typeError('Must be a number not letters')                     
            .integer('Must enter a whole number')
            .moreThan(-1,'Must enter whole numbers greater than zero')
            .required('Must enter a whole number'),
            
            numAvailableSpots: yup.number('Must enter only numbers')
            .typeError('Must be a number not letters')
            .integer('Must enter a whole number')
            .moreThan(-1,'Must enter whole numbers greater than zero')
            .max(yup.ref('capacity'),'Must be equal to capacity or less')
            .required('Must enter a whole number'),  
            
            numOccupiedSpots: yup.number('Must enter only numbers')
            .typeError('Must be a number not letters')
            .integer('Must enter a whole number')
            .moreThan(-1,'Must enter whole numbers greater than zero')
            .max(yup.ref('capacity'),'Must be equal to capacity or less')
            .required('Must enter a whole number'),     
            });

        return (
        <Formik             enableReinitialize
                            validationSchema={schema}
                            onSubmit={values =>
                                {
                                        console.log(values);
                                        if (this.state.confirmationButtonPressed === 'save') {
                                            this.setStateValueForOverrideFieldFromValues (values);
                                            this.saveParkingLotChanges();
                                        } else {
                                            this.resetParkingLot();                                           
                                        }
                                }} 
                            initialValues={{
                            capacity: this.state.capacity,
                            numAvailableSpots: this.state.numAvailableSpots,
                            numOccupiedSpots: this.state.numOccupiedSpots
                            }}
                        >
                            {({
                                handleSubmit,
                                submitForm,
                                handleChange,
                                handleBlur,
                                values,
                                touched,
                                isValid,
                                errors,
                            }) => (       

            <Form noValidate onSubmit = {handleSubmit}> 
            <Container fluid style={{backgroundColor: '#D4F1F4'}}>
                <Row>                  
                    <Col xs ={12} md={12} lg={12} className = "mt-4">
                        <h2 className="mb-3">{this.state.currentParkingLot.name} Parking Lot</h2>
                                          
                        { 
                            this.state.currentParkingLot._id &&  
                            
                            <Override engageOverride = { this.engageOverride } 
                                getOverrideButtonColor = { this.getOverrideButtonColor } 
                                getOverrideTextBoxColor = { this.getOverrideTextBoxColor } 
                                getOverrideTextBoxReadOnly = { this.getOverrideTextBoxReadOnly} 
                                setStateValueForOverrideField = { this.setStateValueForOverrideField } 
                                saveParkingLotChanges = { this.saveParkingLotChanges } 
                                resetParkingLot = { this.resetParkingLot } 
                                /* getStateCapacity = { this.getStateCapacity } 
                                getStateNumAvailableSpots = { this.getStateNumAvailableSpots } 
                                getStateNumOccupiedSpots = { this.getStateNumOccupiedSpots }  */
                                capacity = { this.state.capacity } 
                                numAvailableSpots = { this.state.numAvailableSpots} 
                                numOccupiedSpots = { this.state.numOccupiedSpots } 
                                handleSubmit = {handleSubmit}
                                submitForm = {submitForm}
                                handleChange = {handleChange}
                                handleBlur = {handleBlur}
                                values = {values}
                                touched = {touched}
                                isValid = {isValid}
                                errors = {errors} 
                                setConfirmationButtonPressed = {this.setConfirmationButtonPressed}
                                                           
                            /> 
                        }

                        {/* Custom Button CSS  */}
                        <style type="text/css">
                                {`
                                    .btn-flat {
                                    background-color: #189AB4;                   
                                    color: white;
                                    }

                                    .btn-xxl {
                                    padding: 2rem 2.5rem;
                                    font-size: 1.5rem;
                                    }
                                `}
                        </style>   
                    
                        <Row className="mt-2 mb-2">
                            <Col xs ={12} md={4} lg={6} className = "mt-3">
                                <div className='d-flex justify-content-center'>
                                    <Button variant="success" 
                                        size="xxl" 
                                        onClick={this.decrementNumAvailableSpots}>+</Button> 
                                    <Button variant="success" 
                                        className='ml-5' 
                                        size="xxl" 
                                        style={{ background: "orange" }} 
                                        onClick={this.incrementNumAvailableSpots}>-</Button>                                
                                </div>    
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Container>
            </Form>
        )}
        </Formik>
        );
    }
}

export default Availability ;
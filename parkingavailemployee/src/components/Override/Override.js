import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal'

class Override extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showSaveConfirmation: false,
            showResetConfirmation: false
        }
    }
   
    componentDidMount() {
    }

    openSaveConfirmation = () => {
        this.setState({ showSaveConfirmation: true });
    }

    closeSaveConfirmation = () => this.setState({ showSaveConfirmation: false });
    
    onSaveChanges = () => {
        this.props.saveParkingLotChanges();

        this.closeSaveConfirmation();
    }

    openResetConfirmation = () => {
        this.setState({ showResetConfirmation: true });
    }

    closeResetConfirmation = () => this.setState({ showResetConfirmation: false });

    resetToDefault = () => {
        this.props.resetParkingLot();
        this.closeResetConfirmation();       
    }

    render() {

       return(
        <Row ref={this.wrapper}>

            {/* Custom Button CSS  */}
            <style type="text/css">
                {`
                    .btn-flat {
                    background-color: #189AB4;
                    color: white;
                    }

                    .btn-xxl {
                    padding: 1rem 1.5rem;
                    font-size: 1.5rem;
                    }
                `}
            </style>

            <Col>
                <Row className='mb-2'>
                    <Col xs ={12} md={12} lg={2}><label htmlFor='capacity' className ='ml-2 mt-2'>Capacity:</label></Col>
                    <Col xs ={7} md={7} lg={5}>
                        <div className='d-flex'>
                            <input id='capacity' 
                                className='' 
                                type="text" 
                                name="capacity" 
                                style={{ backgroundColor: this.props.getOverrideTextBoxColor('capacity')}} 
                                readOnly={ this.props.getOverrideTextBoxReadOnly('capacity')}
                                value = {this.props.capacity}
                                onChange={ this.props.setStateValueForOverrideField.bind(this)}/>
                            <Button variant="flat" 
                                size="lg" 
                                className ='ml-2' 
                                onClick={ () => this.props.engageOverride('capacity')} 
                                style= {{backgroundColor: this.props.getOverrideButtonColor('capacity')}}>Override</Button>
                        </div>
                    </Col>
                </Row>
                <Row className='mb-2'>
                    <Col xs ={12} md={12} lg={2}><label htmlFor='numAvailableSpots'className ='ml-2 mt-2'>Number of Available Spots:</label></Col>
                    <Col xs ={7} md={7} lg={5}>
                        <div className='d-flex'>
                            <input id='numAvailableSpots' 
                                className='' 
                                type="text" 
                                name="numAvailableSpots" 
                                style={{ backgroundColor: this.props.getOverrideTextBoxColor('numAvailableSpots')}} 
                                readOnly={ this.props.getOverrideTextBoxReadOnly('numAvailableSpots')} 
                                value = {this.props.numAvailableSpots} 
                                onChange={ this.props.setStateValueForOverrideField.bind(this)}/>
                            <Button variant="flat" 
                                size="lg" 
                                className ='ml-2' 
                                onClick={ () => this.props.engageOverride('numAvailableSpots')} 
                                style= {{backgroundColor: this.props.getOverrideButtonColor('numAvailableSpots')}}>Override</Button>
                        </div>
                    </Col>
                </Row>

                <Row className='mb-2'>
                    <Col xs ={12} md={12} lg={2}><label htmlFor='numOccupiedSpots' className ='ml-2 mt-2'>Number of Occupied Spots:</label></Col>
                    <Col xs ={7} md={7} lg={5}>
                        <div className='d-flex'>
                            <input id='numOccupiedSpots' 
                                className='' 
                                type="text" 
                                name="numOccupiedSpots" 
                                style={{ backgroundColor: this.props.getOverrideTextBoxColor('numOccupiedSpots')}} 
                                readOnly={ this.props.getOverrideTextBoxReadOnly('numOccupiedSpots')} 
                                value = {this.props.numOccupiedSpots} 
                                onChange={ this.props.setStateValueForOverrideField.bind(this) } />
                            <Button variant="flat" 
                                size="lg" 
                                className ='ml-2' 
                                onClick={ () => this.props.engageOverride('numOccupiedSpots')} 
                                style= {{backgroundColor: this.props.getOverrideButtonColor('numOccupiedSpots')}}>Override</Button>
                        </div>
                    </Col>
                </Row>

                <Row className='mt-4'>
                    <Col xs ={12} md={4} lg={6}>
                        <div className='d-flex justify-content-center'>
                            <Button variant="flat" size="lg" onClick={this.openSaveConfirmation}>Save</Button>
                            <Button variant="flat" size="lg" className ='ml-5' onClick={this.openResetConfirmation}>Reset</Button>                 
                        </div>
                    </Col>
                </Row>
            </Col>
            <Modal animation={false} show={this.state.showSaveConfirmation} onHide={this.closeSaveConfirmation}>
                <Modal.Header closeButton>
                    <Modal.Title>Save Changes</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you wish to keep these changes?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.onSaveChanges}>
                    Yes 
                    </Button>
                    <Button variant="secondary" onClick={this.closeSaveConfirmation}>
                    Cancel 
                    </Button>
                </Modal.Footer>
            </Modal> 

            <Modal animation={false} show={this.state.showResetConfirmation} onHide={this.closeResetConfirmation}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset to Default</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you wish to reset the values to default?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.resetToDefault}>
                    Yes 
                    </Button>
                    <Button variant="secondary" onClick={this.closeResetConfirmation}>
                    Cancel 
                    </Button>
                </Modal.Footer>
            </Modal>            
        </Row>);
    }
}

export default Override ;
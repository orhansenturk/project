import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'semantic-ui-react'

export default class UnansweredQuestionsModal extends React.Component{

    render(){
        return(
            <Modal dimmer="inverted" open={true} >
                <Modal.Header>Unanswered questions!</Modal.Header>
                <Modal.Content>
                    Please answer all the questions to continue                
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={this.props.onClose}>
                        Close
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

UnansweredQuestionsModal.PropTypes = {
    onClose: PropTypes.func.isRequired
}
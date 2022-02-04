import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EntityNodeFactory from '../../../../storage/EntityNodeFactory';
import {
    updateHasCompiled
} from './../../../../../redux/actions/values';
import {
    setAlert,
    PRIMARY,
    SUCCESS
} from './../../../../../redux/actions/alert';
import {
    changeNodeStructure
} from './../../../../../redux/actions/audioNodeManager';
import {
    getDefaultPropertiesForType
} from '../../../../storage/audio/Default';
import Validator from './../../../../storage/nodemanager/Validator';
import { InvalidAudioNodeType, InvalidNodeAsAlreadyExists, InvalidNodeName } from '../../../../../static/Messages';
import Logger from '../../../../../static/Logger';

import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Container, ButtonGroup } from 'react-bootstrap';


const Add = ({
    nodeStructure,
    updateHasCompiled,
    changeNodeStructure,
    setAlert
}) => {

    const [nodeProperties, changeNodeProperties] = useState({
        name : "",
        type : null,
        description : "",
    });

    /**
     * Changing the State Values
     * @param {Event} e 
     */
    const onChange = (e) => {
        changeNodeProperties({
            ...nodeProperties,
            [e.target.name] : e.target.value
        });
    }

    /**
     * Calling the Submitting of a New Node
     * @param {Event} e 
     */
    const addNode = (e) => {

        e.preventDefault();
        
        if(!nodeProperties.type){
            setAlert(InvalidAudioNodeType, PRIMARY);
            return;
        }

        if(!Validator.IsUserStringAlphaNumericAndValid(nodeProperties.name)){
            setAlert(InvalidNodeName, PRIMARY);
            return;
        }

        if(nodeStructure.some(node => node.name === nodeProperties.name)){
            setAlert(InvalidNodeAsAlreadyExists, PRIMARY);
            return;
        }

        Logger.LogInfo(`Adding Node: ${nodeProperties.name} Type: ${nodeProperties.type}`);

        changeNodeStructure([
            ...nodeStructure,
            {
                ...nodeProperties,
                properties : getDefaultPropertiesForType(nodeProperties.type)
            }
        ]);

        updateHasCompiled(false);

        setAlert(`Node ${nodeProperties.name} added successfully! `, SUCCESS);
    }

    return (
        <Container className="container">
            <Form>
                <Form.Row className="flexStretch">
                    <Col sm="4">
                        <Form.Group controlId="formAudioNodeName">
                            <Form.Label>Audio Node Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Node Identifier" name="name"
                                value={nodeProperties.name} onChange={e => onChange(e)} />
                            <Form.Text className="text-muted">
                                The name must be uniquely identifiable across the graph.
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col sm="4">
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Describe the Audio Node" name="description"
                                value={nodeProperties.description} onChange={e => onChange(e)} />
                            <Form.Text className="text-muted">
                                What will this node do?
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col sm="4" className="makeFlexCenter">
                            <Dropdown as={ButtonGroup} drop="right">
                                <Button variant="success" onClick={(e) => addNode(e)}>{nodeProperties.type ? `Add ${nodeProperties.type} ` : "Choose Type "}</Button>
                                <Dropdown.Toggle split variant="success" id="dropdown-split-basic">
                                    <i className="fa fa-caret-down"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropDownMenu">
                                {
                                    EntityNodeFactory.getAllTypesOfAudioNodesToAdd().map((nodeName) => 
                                        <Fragment>
                                            <Dropdown.Item className="dropDownItem" key={nodeName} eventKey={nodeName} onSelect={(eventKey, event) => {
                                                changeNodeProperties({
                                                    ...nodeProperties,
                                                    type : eventKey
                                                });
                                            }}>
                                                <i key={`dropDown${nodeName}`} className="fa fa-rocket">{nodeName}</i><br/>
                                            </Dropdown.Item>
                                        </Fragment>
                                    )
                                }
                                </Dropdown.Menu>
                            </Dropdown>
                    </Col>
                </Form.Row>
            </Form>
        </Container>
    )
}

Add.propTypes = {
    nodeStructure: PropTypes.array.isRequired,
    updateHasCompiled : PropTypes.func.isRequired,
    changeNodeStructure : PropTypes.func.isRequired,
    setAlert : PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    nodeStructure : state.audioNodeManager.nodeStructure,
});

export default connect(mapStateToProps, {
    updateHasCompiled,
    changeNodeStructure,
    setAlert
})(Add)


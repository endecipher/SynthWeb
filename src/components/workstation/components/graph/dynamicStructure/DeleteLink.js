import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    changeAdjacencyList
} from '../../../../../redux/actions/audioNodeManager';
import {
    updateHasCompiled
} from '../../../../../redux/actions/values';
import { PRIMARY, setAlert, SUCCESS } from '../../../../../redux/actions/alert';
import Validator from '../../../../storage/nodemanager/Validator';
import EntityNodeFactory from '../../../../storage/EntityNodeFactory';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Container } from 'react-bootstrap';

const DeleteLink = ({
    nodeStructure,
    adjacencyList,
    setAlert,
    changeAdjacencyList,
    updateHasCompiled
}) => {
       
    const [source, changeSourceInfo] = useState({
        sourceName : null,
        sourceProperty : null,
        node : null,
    });

    const [target, updateTarget] = useState({
        adjacencyIndex : -1, //Adjacency Index computed from source
        targetIndex : -1 //ToConnectItem Index of Adjacency
    });
    
    /**
     * Changes the details of the Source
     * @param {Event} e 
     */
    const changeSourceDetails = (e) => {
        changeSourceInfo({
            ...source,
            [e.target.name] : Validator.GetNullableStringValue(e.target.value)
        });

        updateTarget({
            ...target,
            targetIndex : -1
        })
    }
 
    const changeTargetIndex = (e) => {
        updateTarget({
            ...target,
            targetIndex : e.target.value
        });
    }

    /**
     * Update SourceNode
     */
    useEffect(() => {
        let node = null;

        if(source.sourceName !== null){
            node = nodeStructure.find(x=> x.name == source.sourceName) ?? null;
        }

        changeSourceInfo({
            ...source,
            node : node
        });
    }, [source.sourceName]);

    useEffect(() => {
        if(source.node){
            let adjacencyIndex = adjacencyList.findIndex(adj => adj.from.name == source.sourceName 
                && adj.from.property == source.sourceProperty);

            if(adjacencyIndex !== -1){
                updateTarget({
                    ...target,
                    adjacencyIndex : adjacencyIndex,
                    targetIndex : 0
                });
            }
        }
    }, [source.node]);


    /**
     * Get Available Connects of the type
     * @param {String} type
     * @returns {Array<String>} MappedItems  
     */
    const getAvailableConnects = (type) => {
        return [
            "",
            ...EntityNodeFactory.getAvailableConnectsForAudioNodeType(type)
        ];
    }

    /**
     * Delete a Link
     * @param {Event} e 
     */
    const deleteLink = (e) => {
        e.preventDefault();

        if(target.adjacencyIndex == -1 || target.targetIndex == -1){
            setAlert(`Please enter valid Link details for deletion. `, PRIMARY);
            return;
        }

        let adjacency = adjacencyList[target.adjacencyIndex];

        if(adjacency.to.length == 1){
            adjacencyList.splice(target.adjacencyIndex, 1);
            changeAdjacencyList([
                ...adjacencyList
            ]);
        }else{
            adjacency.to.splice(target.targetIndex, 1);
            changeAdjacencyList([
                ...adjacencyList
            ]);
        }
        
        updateHasCompiled(false);
        setAlert(`Deleted Link successfully!`, SUCCESS);
    }

    
    return (
        <Container className="container">
            <Form>
            <Form.Row className="flexStretch">
                <Col sm="6">
                    <Form.Group controlId="fromAudioNodeName">
                        <Form.Label>Source Node Name</Form.Label>
                        <Form.Control type="text" 
                            name="sourceName" 
                            placeholder="Source Node Name" 
                            onChange={(e) => changeSourceDetails(e)} />
                        <Form.Text className="text-muted">
                            The node name from which the link starts. Case-sensitive.
                        </Form.Text>
                        <Form.Text>
                            {
                                source.node ? <i className="fas fa-check">{' '}Source Verified</i> : <Fragment/>
                            }
                        </Form.Text>
                    </Form.Group>
                </Col>
                <Col sm="6">
                {
                    source.node !== null ?
                        (
                            <Form.Group controlId="sourceNodeProperty">
                                <Form.Label>Source Node Property</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="sourceProperty"
                                    id="customSelectSourceProperty"
                                    onChange={(e) => changeSourceDetails(e)}
                                >
                                    {
                                        getAvailableConnects(source.node.type).map(type => 
                                            <option value={type}>{type ? `.${type}` : "Node"}</option>
                                        )
                                    }
                                </Form.Control>
                                <Form.Text className="text-muted">
                                    Selection could be a Node or a property.
                                </Form.Text><br/>
                                <Form.Text>
                                    Properties are denoted by a '.' before their name.
                                </Form.Text>
                            </Form.Group>
                        ) : 
                        (<Fragment/>)
                }
                </Col>
            </Form.Row>
            <Form.Row className="flexStretch">
                <Col sm="12">
                {
                    target.adjacencyIndex >= 0 ?
                        (
                            <Form.Group controlId="targetDetails">
                                <Form.Label>Target Link</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="targetLink"
                                    id="customSelecttargetProperty"
                                    onChange={(e) => changeTargetIndex(e)}
                                >
                                    {
                                        adjacencyList[target.adjacencyIndex].to.map((connect, index) => 
                                            <option value={index}>{`${connect.name}${connect.property ? `.${connect.property}` : ''}`}</option>
                                        )
                                    }
                                </Form.Control>
                                <Form.Text className="text-muted">
                                    This action is irreversible. 
                                </Form.Text>
                            </Form.Group>
                        ) : 
                        (<Fragment/>)
                }
                </Col>
            </Form.Row>
            <Form.Row className="flexStretch">
                <Col sm="12">
                    <Form.Group controlId="deleteLinkProperty">
                    {
                        target.adjacencyIndex !== -1 && target.targetIndex >= 0 ? 
                        <Button variant="success" onClick={(e) => deleteLink(e)} block>{"Delete Link"}</Button>
                        : <Fragment/>
                    }
                    </Form.Group>
                </Col>
            </Form.Row>
            </Form>
        </Container>
    )
}

DeleteLink.propTypes = {
    adjacencyList : PropTypes.array.isRequired,
    nodeStructure : PropTypes.array.isRequired,
    changeAdjacencyList : PropTypes.func.isRequired,
    updateHasCompiled : PropTypes.func.isRequired,
    setAlert : PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    adjacencyList : state.audioNodeManager.adjacencyList,
    nodeStructure : state.audioNodeManager.nodeStructure
});

export default connect(mapStateToProps, {
    changeAdjacencyList,
    updateHasCompiled,
    setAlert
})(DeleteLink)

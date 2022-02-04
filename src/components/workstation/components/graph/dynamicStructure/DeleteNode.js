import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    changeAdjacencyList,
    changeNodeStructure
} from '../../../../../redux/actions/audioNodeManager';
import {
    updateHasCompiled
} from '../../../../../redux/actions/values';
import {
    setAlert,
    PRIMARY,
    SUCCESS
} from './../../../../../redux/actions/alert';
import Logger from '../../../../../static/Logger';

import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form';
import { Col, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const DeleteNode = ({
    nodeStructure,
    adjacencyList,
    changeAdjacencyList,
    changeNodeStructure,
    updateHasCompiled
}) => {

    const [nodeNameToDelete, changeNodeToDelete] = useState(null);

    /**
     * Change the selected NOde To Delete
     * @param {EventKey} eventKey 
     */
    const selectNodeToDelete = (eventKey) =>{
        changeNodeToDelete(eventKey);
    }

    /**
     * Delete the node and all its links
     * @param {Event} e 
     */
    const deleteNode = (e) => {

        Logger.LogInfo(`Deleting Node ${nodeNameToDelete}...`);
        let newAdjacencyList = [];
        adjacencyList.forEach(adjacency => {
            const {
                name : nodeName,
            } = adjacency.from;

            if(nodeName != nodeNameToDelete){
                newAdjacencyList.push({
                    from : adjacency.from,
                    to : adjacency.to.filter(toInfo=> toInfo.name !== nodeNameToDelete)
                });
            }
        });

        changeNodeStructure([
            ...nodeStructure.filter(node => node.name !== nodeNameToDelete)
        ]);

        changeAdjacencyList(newAdjacencyList);

        updateHasCompiled(false);
        
        setAlert(`Node ${nodeNameToDelete} was deleted successfully! `, SUCCESS);
    }

    /**
     * Returns the Nodes neatly sorted by their types.
     * @returns {Array<String>}
     */
    const getItems = () => {
        let nodeDetails = [];

        nodeStructure.forEach(node => {
            nodeDetails.push({
                nodeName : node.name,
                nodeType : node.type
            });
        });

        return nodeDetails.sort(node=> node.nodeType);
    }

    return (
        <Container className="container">
            <Form>
                <Form.Row className="flexStretch">
                    <Col sm="6">
                        <ListGroup variant="flush">
                            {
                                getItems().map(({nodeName, nodeType}) => 
                                    <ListGroup.Item key={nodeName} eventKey={nodeName} onSelect={(eventKey) => selectNodeToDelete(eventKey)}>
                                        {nodeName} : <b>${nodeType}</b>
                                    </ListGroup.Item>
                                )
                            }
                        </ListGroup>
                    </Col>
                    <Col sm="6">
                        {
                            nodeNameToDelete !== null ? 
                            <div variant="success">
                                <h1>Delete node {nodeNameToDelete}?</h1>
                                <p>
                                    This action will be permanent and irreversible. <br/> 
                                    The node {nodeNameToDelete} properties and its belonging connections will be deleted. 
                                </p>
                                <hr />
                                <p className="mb-0">
                                <Button variant="secondary" size="lg" onClick={(e) => deleteNode(e)}>
                                    Confirm Deletion
                                </Button>
                                </p>
                            </div>
                                : 
                            <div className="makeFlexCenter"><i>Choose Node To Delete</i></div>
                        }
                    </Col>
                </Form.Row>
            </Form>
        </Container>
    )
}

DeleteNode.propTypes = {
    nodeStructure: PropTypes.array.isRequired,
    adjacencyList : PropTypes.array.isRequired,
    changeAdjacencyList : PropTypes.func.isRequired,
    changeNodeStructure : PropTypes.func.isRequired,
    updateHasCompiled : PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    nodeStructure : state.audioNodeManager.nodeStructure,
    adjacencyList : state.audioNodeManager.adjacencyList
});

export default connect(mapStateToProps, {
    changeAdjacencyList,
    changeNodeStructure,
    updateHasCompiled
})(DeleteNode)

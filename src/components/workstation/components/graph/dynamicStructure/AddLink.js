import React, { Fragment, useEffect, useState } from 'react';
import Logger from '../../../../../static/Logger';
import {
    changeAdjacencyList
} from './../../../../../redux/actions/audioNodeManager';
import {
    setAlert,
    PRIMARY,
    SUCCESS
} from './../../../../../redux/actions/alert';
import {
    updateHasCompiled
} from './../../../../../redux/actions/values';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Validator from './../../../../storage/nodemanager/Validator';
import EntityNodeFactory from '../../../../storage/EntityNodeFactory';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Container } from 'react-bootstrap';

const AddLink = ({
    anm,
    nodeStructure,
    adjacencyList,
    changeAdjacencyList,
    setAlert,
    updateHasCompiled
}) => {

    const [source, changeSourceInfo] = useState({
        sourceName : null,
        sourceProperty : null,
        node : null,
    });

    const [target, changeTargetInfo] = useState({
        targetName : null,
        targetProperty : null,
        node : null
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
    }

    /**
     * Changes the details of the Target
     * @param {Event} e 
     */
    const changeTargetDetails = (e) => {
        changeTargetInfo({
            ...target,
            [e.target.name] : Validator.GetNullableStringValue(e.target.value)
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

    /**
     * Update TargetNode
     */
    useEffect(() => {

        let node = null;

        if(target.targetName !== null){
            node = nodeStructure.find(x=> x.name == target.targetName) ?? null;
        }

        changeTargetInfo({
            ...target,
            node : node
        });
    }, [target.targetName]);

    /**
     * Add a Link
     * @param {Event} e 
     */
    const addLink = (e) => {
        e.preventDefault();

        if(!source.node){
            setAlert(`Please enter a valid source Node Name. `, PRIMARY);
            return;
        }

        if(!target.node){
            setAlert(`Please enter a valid target Node Name. `, PRIMARY);
            return;
        }

        let doesLinkExist = anm.current.getGraphicalInfoManager().hasLinkInfo(
            source.sourceName,
            target.targetName,
            source.sourceProperty,
            target.targetProperty
        );

        if(doesLinkExist){
            setAlert(`The connection being added already exists. `, PRIMARY);
            return;
        }

        let adjIndex = 
            adjacencyList.findIndex(adj => 
                adj.from.name == source.sourceName && adj.from.property == source.sourceProperty);

        if(adjIndex == -1){
            Logger.LogInfo(`Adding new Link from ${source.sourceName} ${source.sourceProperty ?? ""} to ${target.targetName} ${target.targetProperty ?? ""}`);
            changeAdjacencyList([
                ...adjacencyList,
                {
                    from : {
                        name : source.sourceName,
                        property : source.sourceProperty
                    },
                    to : [
                        {
                            name: target.targetName,
                            property : target.targetProperty
                        }
                    ]
                }
            ]);
        }else{
            Logger.LogInfo(`Found existing From : ${source.sourceName} ${source.sourceProperty ?? ""}
                \n and adding toConnectItem ${target.targetName} ${target.targetProperty ?? ""}`);

            //Remove the element from AdjacencyList and store in temp variable
            let adjacencyMatched = adjacencyList.splice(adjIndex, 1);

            let modifiedConnect = adjacencyMatched[0].to.push({
                name: target.targetName,
                property : target.targetProperty
            });

            var newAdjacencyList = [
                ...adjacencyList,
                {
                    ...adjacencyMatched[0]
                }
            ];

            changeAdjacencyList([
                ...adjacencyList,
                {
                    ...adjacencyMatched[0]
                }
            ]);
        }

        updateHasCompiled(false);

        setAlert(`Added Link successfully!`, SUCCESS);
    }

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
                    <Form.Group controlId="toAudioNodeName">
                        <Form.Label>Target Node Name</Form.Label>
                        <Form.Control type="text" 
                            name="targetName" 
                            placeholder="Target Node Name" 
                            onChange={(e) => changeTargetDetails(e)} />
                            
                        <Form.Text className="text-muted">
                            The node name to which the link ends. Case-sensitive.
                        </Form.Text>
                        <Form.Text>
                            {
                                target.node ? <i className="fas fa-check">{' '}Target Verified</i> : <Fragment/>
                            }
                        </Form.Text>
                    </Form.Group>
                </Col>
            </Form.Row>
            <Form.Row className="flexStretch">
                <Col sm="6">
                {
                    source.node !== null ?
                        (
                            <Form.Group controlId="sourceNodeProperty">
                                <Form.Control
                                    as="select"
                                    name="sourceProperty"
                                    controlId="customSelectSourceProperty"
                                    onChange={(e) => changeSourceDetails(e)}
                                >
                                    {
                                        getAvailableConnects(source.node.type).map(type => 
                                            <option value={type}>{type ? `.${type}` : "Node"}</option>
                                        )
                                    }
                                </Form.Control>
                            </Form.Group>
                        ) : 
                        (<Fragment/>)
                }
                </Col>
                <Col sm="6">
                {
                    target.node !== null ?
                        (
                            <Form.Group controlId="targetNodeProperty">
                                <Form.Control
                                    as="select"
                                    name="targetProperty"
                                    controlId="customSelecttargetProperty"
                                    onChange={(e) => changeTargetDetails(e)}
                                >
                                    {
                                        getAvailableConnects(target.node.type).map(type => 
                                            <option value={type}>{type ? `.${type}` : "Node"}</option>
                                        )
                                    }
                                </Form.Control>
                            </Form.Group>
                        ) : 
                        (<Fragment/>)
                }
                </Col>
            </Form.Row>
            <Form.Row className="flexStretch">
                <Col sm="12">
                    <Form.Group controlId="addLinkProperty">
                    {source.node && target.node ? 
                        <Button variant="success" onClick={(e) => addLink(e)} block>{"Add the Link"}</Button>
                        : <Fragment/>}
                    </Form.Group>
                </Col>
            </Form.Row>
            </Form>
        </Container>
    )
}

AddLink.propTypes = {
    nodeStructure: PropTypes.array.isRequired,
    adjacencyList : PropTypes.array.isRequired,
    updateHasCompiled : PropTypes.func.isRequired,
    changeAdjacencyList : PropTypes.func.isRequired,
    setAlert : PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    nodeStructure : state.audioNodeManager.nodeStructure,
    adjacencyList : state.audioNodeManager.adjacencyList
});

export default connect(mapStateToProps, {
    updateHasCompiled,
    changeAdjacencyList,
    setAlert
})(AddLink)


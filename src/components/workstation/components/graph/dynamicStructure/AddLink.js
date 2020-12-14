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

        if(!source.Node){
            setAlert(`Please enter a valid source Node Name. `, PRIMARY);
            return;
        }

        if(!target.Node){
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
            changeAdjacencyList([
                ...adjacencyList.splice(adjIndex, 1),
                {
                    from : adjacencyList[adjIndex].from,
                    to : adjacencyList[adjIndex].to.push({
                        name: target.targetName,
                        property : target.targetProperty
                    })
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
        <Fragment>
            <Form>
            <Row>
                <Col>
                    <input type="text" 
                    name="sourceNodeName" 
                    placeholder="Source Node Name" 
                    onChange={(e) => changeSourceDetails(e)}/>{' '}
                    {
                        source.node ? <i className="fas fa-check"></i> : <Fragment/>
                    }
                </Col>
                <Col>
                    <input type="text" 
                    name="targetNodeName" 
                    placeholder="Target Node Name" 
                    onChange={(e) => changeTargetDetails(e)}/>{' '}
                    {
                        target.node ? <i className="fas fa-check"></i> : <Fragment/>
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                {
                    source.node !== null ?
                        (
                            <Fragment>
                                <Form.Control
                                    as="select"
                                    className="mr-sm-2"
                                    name="sourceProperty"
                                    id="customSelectSourceProperty"
                                    onChange={(e) => changeSourceDetails(e)}
                                    custom
                                >
                                    {
                                        getAvailableConnects(source.node.type).map(type => 
                                            <option value={type}>{type ? `.${type}` : "Node"}</option>
                                        )
                                    }
                                </Form.Control>
                            </Fragment>
                        ) : 
                        (<Fragment/>)
                }
                </Col>
                <Col>
                {
                    target.node !== null ?
                        (
                            <Fragment>
                                <Form.Control
                                    as="select"
                                    className="mr-sm-2"
                                    name="targetProperty"
                                    id="customSelecttargetProperty"
                                    onChange={(e) => changeTargetDetails(e)}
                                    custom
                                >
                                    {
                                        getAvailableConnects(target.node.type).map(type => 
                                            <option value={type}>{type ? `.${type}` : "Node"}</option>
                                        )
                                    }
                                </Form.Control>
                            </Fragment>
                        ) : 
                        (<Fragment/>)
                }
                </Col>
            </Row>
                <button onClick={(e) => addLink(e)}>Add the Link</button>
            </Form>
        </Fragment>
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


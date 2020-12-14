import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    changeAdjacencyList
} from '../../../../../redux/actions/audioNodeManager';
import {
    updateHasCompiled
} from '../../../../../redux/actions/values';
import { useEffect } from 'react';
import { PRIMARY, setAlert, SUCCESS } from '../../../../../redux/actions/alert';

const DeleteLink = ({
    nodeStructure,
    adjacencyList
}) => {
       
    const [source, changeSourceInfo] = useState({
        sourceName : null,
        sourceProperty : null,
        node : null,
    });

    const [target, updateTarget] = useState({
        adjacencyIndex : -1, //Adjacency Index computed from source
        targetIndex : 0 //ToConnectItem Index of Adjacency
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

    const changeValue = (e) => {
        changeInfo({
            ...selectLinkInfo,
            [e.target.name] : e.target.value
        });
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
                    targetIndex : -1
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
            changeAdjacencyList([
                ...adjacencyList.splice(target.adjacencyIndex, 1),
            ]);
        }else{
            changeAdjacencyList([
                ...adjacencyList.splice(target.adjacencyIndex, 1),
                {
                    ...adjacency,
                    to : adjacency.to.splice(target.targetIndex, 1)
                }
            ]);
        }
        
        updateHasCompiled(false);

        
        setAlert(`Deleted Link successfully!`, SUCCESS);
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
                {
                    source.node !== null ?
                        (
                            <Fragment>
                                <Form.Control
                                    as="select"
                                    className="mr-sm-2"
                                    name="sourceProperty"
                                    id="customSelectSourceProperty"
                                    onChange={(e) => changeTargetIndex(e)}
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
            </Row>
            <Row>
                <Col>
                {
                    target.adjacencyIndex >= 0 ?
                        (
                            <Fragment>
                                <Form.Control
                                    as="select"
                                    className="mr-sm-4"
                                    name="targetLink"
                                    id="customSelecttargetProperty"
                                    onChange={(e) => changeTargetDetails(e)}
                                    custom
                                >
                                    <option value={-1}>Choose Link..</option>
                                    {
                                        adjacencyList[target.adjacencyIndex].to.forEach((connect, index) => 
                                            <option value={index}>{`${connect.name}${connect.property ? `.${connect.property}` : ''}`}</option>
                                        )
                                    }
                                </Form.Control>
                            </Fragment>
                        ) : 
                        (<Fragment/>)
                }
                </Col>
            </Row>
                <button onClick={(e) => deleteLink(e)}>Delete Link</button>
            </Form>
        </Fragment>
    )
}

DeleteLink.propTypes = {
    adjacencyList : PropTypes.array.isRequired,
    changeAdjacencyList : PropTypes.func.isRequired,
    updateHasCompiled : PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    adjacencyList : state.audioNodeManager.adjacencyList
});

export default connect(mapStateToProps, {
    changeAdjacencyList,
    updateHasCompiled
})(DeleteLink)

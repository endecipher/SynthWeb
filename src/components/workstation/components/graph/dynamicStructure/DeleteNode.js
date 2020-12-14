import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import {
    changeAdjacencyList,
    changeNodeStructure
} from '../../../../../redux/actions/audioNodeManager';
import {
    updateHasCompiled
} from '../../../../../redux/actions/values';
import {
    setAlert,
    PRIMARY
} from './../../../../../redux/actions/alert';
import Logger from '../../../../../static/Logger';

const DeleteNode = ({
    nodeStructure,
    adjacencyList
}) => {

    const [nodeNameToDelete, changeNodeToDelete] = useState(null);

    /**
     * Change the selected NOde To Delete
     * @param {Event} e 
     */
    const selectNodeToDelete = (e) =>{
        changeNodeToDelete(e.target.name);
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

            if(nodeName == nodeNameToDelete)
                continue;
            
            newAdjacencyList.push({
                from : adjacency.from,
                to : adjacency.to.filter(toInfo=> toInfo.name == nodeNameToDelete)
            });
        });

        changeNodeStructure({
            ...nodeStructure.filter(node => node.name == nodeNameToDelete)
        });

        changeAdjacencyList(newAdjacencyList);

        updateHasCompiled(false);
    }

    /**
     * Returns the Nodes neatly sorted by their types.
     * @returns {Map<String,Array<String>>}
     */
    const getItemMap = () => {
        let typeMap = new Map();

        nodeStructure.forEach(element => {
            if(typeMap.has(element.type)){
                typeMap.set(element.type, typeMap.get(element.type).unshift(element.name));
            }else{
                typeMap.set(element.type, [ element.name ]);
            }
        });

        return typeMap;
    }
    

    return (
        <Fragment>
            <Dropdown>
            <Dropdown.Toggle variant="danger" id="dropdown-basic-delete">
                {nodeNameToDelete ?? "Choose Node to remove"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {
                    getItemMap().forEach((key, value) => {
                        <Fragment>
                            <Dropdown.Divider/>
                            <Dropdown.ItemText><b>{key}s</b></Dropdown.ItemText>
                            <Dropdown.Divider/>
                        </Fragment>
                        value.forEach(nodeName => 
                        <Dropdown.Item>
                            <div name={nodeName} onClick={(e) => selectNodeToDelete(e)}>
                                {nodeName}
                            </div>
                        </Dropdown.Item>
                        )
                    })
                }
            </Dropdown.Menu>
            </Dropdown>
            {
                nodeNameToDelete !== null ? 
                    <Fragment>
                        This action will be permanent and irreversible. <br/> 
                        The Node and its connections will be deleted. 
                        <button onClick={(e)=> deleteNode(e)}>Confirm Deletion</button>
                    </Fragment>
                    : <Fragment/>
            }
        </Fragment>
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

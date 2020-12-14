import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Default from './../../../../storage/audio/Default';
import {
    changeAdjacencyList,
    changeNodeStructure
} from './../../../../../redux/actions/audioNodeManager';
import {
    updateHasCompiled
} from './../../../../../redux/actions/values';

/**
 * 
 * @deprecated
 * @desciption DO NOT USE ANYMORE 
 */
const Submit = ({
    name,
    type,
    nodeStructure,
    adjacencyList,
    inputLinks,
    outputLinks,

    changeAdjacencyList,
    changeNodeStructure,
    updateHasCompiled
}) => {


    const triggerUpdates = (e) => {

        let newNodeStructure = nodeStructure;

        newNodeStructure.unshift({
            name : name,
            type : type,
            description : "A New Node added by the user",
            properties : Default.getDefaultPropertiesForType(type)
        });

        let newAdjacencyList = adjacencyList;

        let inputLinkMap = new Map();

        inputLinks.forEach(link => {
            inputLinkMap.set(link.name, true);
        });

        newAdjacencyList.forEach(adjacency => {
            if(inputLinkMap.has(adjacency.name)){
                adjacency.links.unshift({
                    name : name,
                    property : null //TODO: Create property 
                })
            }
        });

        const newAdjacencyOutputLink = {
            name : name,
            links : []
        };

        outputLinks.forEach(link => {
            newAdjacencyOutputLink.links.unshift({
                name : link.name,
                property : link.property
            });
        });

        newAdjacencyList.unshift(newAdjacencyOutputLink);

        changeNodeStructure(newNodeStructure);
        changeAdjacencyList(newAdjacencyList);
        updateHasCompiled(false);
    }

    return (
        outputLinks.length > 0 ? 
            <Button variant="primary" type="submit" onClick={(e) => triggerUpdates(e)}>
                Add a link
            </Button> : <Fragment />
    )
}

Submit.propTypes = {
    anm: PropTypes.object.isRequired,
    nodeStructure: PropTypes.array.isRequired,
    adjacencyList : PropTypes.array.isRequired,
    changeAdjacencyList : PropTypes.func.isRequired,
    changeNodeStructure : PropTypes.func.isRequired,
    inputLinks : PropTypes.array.isRequired,
    outputLinks : PropTypes.array.isRequired, 
}

const mapStateToProps = (state) => ({
    inputLinks : state.addNode.inputLinks,
    outputLinks : state.addNode.outputLinks,
    nodeStructure : state.audioNodeManager.nodeStructure,
    adjacencyList : state.audioNodeManager.adjacencyList
});

export default connect(mapStateToProps, {
    changeAdjacencyList,
    changeNodeStructure,
    updateHasCompiled
})(Submit)

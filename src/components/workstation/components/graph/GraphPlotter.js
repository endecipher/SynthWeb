import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Graph } from "react-d3-graph";
import {
    updateShowKeyboard
} from './../../../../redux/actions/values';
import {
    setAlert,
    PRIMARY
} from './../../../../redux/actions/alert';
import {
    changeActiveStateDetailsAction
} from './../../../../redux/actions/activeState';
import { d3GraphConfig } from './GraphConfigs';

const GraphPlotter = ({
    anm,
    changeActiveStateDetailsAction,
    updateShowKeyboard,
    setAlert
}) => {

    const viewProperties = (nodeName) => {
        const currentState = anm.current.fetchNodeActiveState(nodeName);

        if(currentState != null){
            changeActiveStateDetailsAction(currentState);
            //After the above is done, 
            updateShowKeyboard(false);
        }
    };

    const viewLinkProperties = (sourceNodeName, targetNodeName) => {
        let linkString = 
            anm.current.getGraphicalInfoManager()
                .getConnectingLinks(sourceNodeName, targetNodeName);

        setAlert(linkString, PRIMARY, 2000);
    } 

    const getGraphCompatibleData = () => {
        return anm.current.getGraphicalData();
    };

    const onClickGraph = function() {
        //window.alert(`Clicked the graph background`);
    };

    const onMouseOverNode = function(nodeId) {
        //window.alert(`Mouse over node ${nodeId}`);
    };

    const onMouseOutNode = function(nodeId) {
        //window.alert(`Mouse out node ${nodeId}`);
    };

    const onClickLink = function(source, target) {
        viewLinkProperties(source, target);
    };

    const onRightClickLink = function(event, source, target) {
        viewLinkProperties(source, target);
    };

    const onMouseOverLink = function(source, target) {
        //
    };

    const onMouseOutLink = function(source, target) {
        //window.alert(`Mouse out link between ${source} and ${target}`);
    };

    const onNodePositionChange = function(nodeId, x, y) {
        //window.alert(`Node ${nodeId} is moved to new position. New position is x= ${x} y= ${y}`);
    };

    return (
        <Fragment>
                <Graph
                id="AudioGraphPlotter-1" 
                data={getGraphCompatibleData()}
                config={d3GraphConfig}
                onClickNode={viewProperties}
                onDoubleClickNode={viewProperties}
                onRightClickNode={viewProperties}
                onClickGraph={onClickGraph}
                onClickLink={onClickLink}
                onRightClickLink={onRightClickLink}
                onMouseOverNode={onMouseOverNode}
                onMouseOutNode={onMouseOutNode}
                onMouseOverLink={onMouseOverLink}
                onMouseOutLink={onMouseOutLink}
                onNodePositionChange={onNodePositionChange}/>
            <hr/>
        </Fragment>
    )
}

GraphPlotter.propTypes = {
    anm : PropTypes.object.isRequired,
    changeActiveStateDetailsAction : PropTypes.func.isRequired,
    updateShowKeyboard : PropTypes.func.isRequired,
    setAlert : PropTypes.func.isRequired,
}

export default connect(null, {
    updateShowKeyboard,
    changeActiveStateDetailsAction,
    setAlert
})(GraphPlotter);

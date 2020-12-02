import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Graph } from "react-d3-graph";
import {
    updateShowKeyboard
} from './../../../../redux/actions/values';
import {
    changeActiveStateDetailsAction
} from './../../../../redux/actions/activeState';
import { d3GraphConfig } from './GraphConfigs';

const GraphPlotter = ({
    anm
}) => {
    
    const viewProperties = (nodeName) => {
        const currentState = anm.current.fetchNodeActiveState(nodeName);
        changeActiveStateDetailsAction(currentState);
        //After the above is done, 
        updateShowKeyboard(false);
    };

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
        //window.alert(`Clicked link between ${source} and ${target}`);
    };

    const onRightClickLink = function(event, source, target) {
        //window.alert(`Right clicked link between ${source} and ${target}`);
    };

    const onMouseOverLink = function(source, target) {
        //window.alert(`Mouse over in link between ${source} and ${target}`);
    };

    const onMouseOutLink = function(source, target) {
        //window.alert(`Mouse out link between ${source} and ${target}`);
    };

    const onNodePositionChange = function(nodeId, x, y) {
        //window.alert(`Node ${nodeId} is moved to new position. New position is x= ${x} y= ${y}`);
    };

    return (
        <Fragment>
            Showing Graph:
            <hr/>
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
                onNodePositionChange={onNodePositionChange}/>;
            <hr/>
        </Fragment>
    )
}

GraphPlotter.propTypes = {
    anm : PropTypes.object.isRequired,
}

export default connect(null, {
    updateShowKeyboard,
    changeActiveStateDetailsAction
})(GraphPlotter);

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import GraphPlotter from './GraphPlotter';
import InputCutOff from './InputCutOff';
import Compile from './Compile';
import NodeValueChanger from './NodeValueChanger';
import DynamicNodeChanger from './DynamicNodeChanger';

const AudioGraph = ({
    anm
}) => {
    return (
        <Fragment>
            Audio Graph
            <DynamicNodeChanger anm={anm}/>
            <GraphPlotter anm={anm} />
            <NodeValueChanger anm={anm}/>
            <InputCutOff anm={anm}/>
            <Compile anm={anm}/>
        </Fragment>
    )
}

AudioGraph.propTypes = {
    anm : PropTypes.object.isRequired,
}

export default AudioGraph;

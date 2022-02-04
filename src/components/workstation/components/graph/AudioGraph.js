import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import GraphPlotter from './GraphPlotter';
import InputCutOff from './InputCutOff';
import NodeValueChanger from './NodeValueChanger';
import DynamicNodeChanger from './DynamicNodeChanger';
import ExportAll from './ExportAll';

const AudioGraph = ({
    anm
}) => {
    return (
        <Fragment>
            <ExportAll anm={anm}/>
            <DynamicNodeChanger anm={anm}/>
            <GraphPlotter anm={anm} />
            <NodeValueChanger anm={anm}/>
            <InputCutOff anm={anm}/>
        </Fragment>
    )
}

AudioGraph.propTypes = {
    anm : PropTypes.object.isRequired,
}

export default AudioGraph;

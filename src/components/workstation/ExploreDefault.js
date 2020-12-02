import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    exploreDefault
} from './../../redux/actions/combinedActions';

const ExploreDefault = ({
    anm,
    exploreDefault
}) => {

    const explore = (e) => {

        anm.current.initializeAudioNodeManager();
        const informationStructure = anm.current.getInformationStructure();

        const {
            NodeStructure,
            AdjacencyList
        } = informationStructure;

        exploreDefault(NodeStructure, AdjacencyList);
    };

    return (
        <div>
            <button onClick={(e) => explore(e)}> Click Me for Exploration </button>
        </div>
    )
}

ExploreDefault.propTypes = {
    anm : PropTypes.object.isRequired,
    exploreDefault : PropTypes.func.isRequired,
}

export default connect(null, {
    exploreDefault
})(ExploreDefault)

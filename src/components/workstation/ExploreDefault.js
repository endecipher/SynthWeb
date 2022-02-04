import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    exploreDefault
} from './../../redux/actions/combinedActions';
import Button from 'react-bootstrap/Button';

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
        <Button size="lg" key="explore" variant="primary" onClick={(e) => explore(e)}>
                <i className="fa fa-fighter-jet" aria-hidden="true"></i>
                <span className="padLeft">Explore!</span>
        </Button>
    )
}

ExploreDefault.propTypes = {
    anm : PropTypes.object.isRequired,
    exploreDefault : PropTypes.func.isRequired,
}

export default connect(null, {
    exploreDefault
})(ExploreDefault)

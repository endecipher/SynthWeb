import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Uploader from './Uploader';
import ExploreDefault from './ExploreDefault';

const Home = ({
    anm
}) => {
    return (
        <Fragment>
            Click here to upload a .symthweb file: <Uploader />
            or you can choose to explore the defaults.
            <ExploreDefault anm={anm} />
        </Fragment>
    )
}

Home.propTypes = {
    anm : PropTypes.object.isRequired,
}

export default Home

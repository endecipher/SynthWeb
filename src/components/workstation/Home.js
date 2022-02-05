import React from 'react';
import PropTypes from 'prop-types';
import Uploader from './Uploader';
import ExploreDefault from './ExploreDefault';
import { Container, Jumbotron } from 'react-bootstrap';

const Home = ({
    anm
}) => {
    return (
        <Container>
            <Jumbotron>
            <h1>Welcome!</h1>
                This is a simple synthesizer. <br/> <hr/>
                <Uploader anm={anm} /> <br/> <hr/>
                <ExploreDefault anm={anm} />
            </Jumbotron>
        </Container>
    )
}

Home.propTypes = {
    anm : PropTypes.object.isRequired,
}

export default Home

import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import EntityNodeFactory from '../../../../storage/EntityNodeFactory';
import {
    updateHasCompiled
} from './../../../../../redux/actions/values';
import {
    setAlert,
    PRIMARY
} from './../../../../../redux/actions/alert';
import {
    changeNodeStructure
} from './../../../../../redux/actions/audioNodeManager';
import {
    getDefaultPropertiesForType
} from '../../../../storage/audio/Default';
import Validator from './../../../../storage/nodemanager/Validator';
import { InvalidNodeAsAlreadyExists, InvalidNodeName } from '../../../../../static/Messages';
import Logger from '../../../../../static/Logger';

const Add = ({
    nodeStructure,
    updateHasCompiled,
    changeNodeStructure,
    setAlert
}) => {

    const [nodeProperties, changeNodeProperties] = useState({
        name : "",
        type : null,
        description : "",
    });

    /**
     * Change Node Type
     * @param {*} e 
     */
    const selectNodeType = (e) => {
        changeNodeProperties({
            ...nodeProperties,
            type : e.target.name
        });
    }

    /**
     * Changing the State Values
     * @param {Event} e 
     */
    const onChange = (e) => {
        changeNodeProperties({
            ...nodeProperties,
            [e.target.name] : e.target.value
        });
    }

    /**
     * Calling the Submitting of a New Node
     * @param {Event} e 
     */
    const addNode = (e) => {

        e.preventDefault();
        
        if(!Validator.IsUserStringAlphaNumericAndValid(nodeProperties.name)){
            setAlert(InvalidNodeName, PRIMARY);
            return;
        }

        if(nodeStructure.some(node => node.name == nodeProperties.name)){
            setAlert(InvalidNodeAsAlreadyExists, PRIMARY);
            return;
        }

        Logger.LogInfo(`Adding Node: ${nodeProperties.name} Type: ${nodeProperties.type}`);

        changeNodeStructure([
            ...nodeStructure,
            {
                ...nodeProperties,
                properties : getDefaultPropertiesForType(nodeProperties.type)
            }
        ]);

        updateHasCompiled(false);
    }

    return (
        <Fragment>
            <Form>
                <Row>
                    <Col>
                        <input type="text" placeholder="Type a unique name" name="name"
                            value={nodeProperties.name} onChange={e => onChange(e)} required />
                    </Col>
                    <Col>
                        <input type="text" placeholder="Describe the Audio Node" name="description"
                            value={nodeProperties.name} onChange={e => onChange(e)} />
                    </Col>
                    <Col>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic-add">
                            { nodeProperties.type ?? "Select Type"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                EntityNodeFactory.getAllTypesOfAudioNodesToAdd().map((nodeName) => 
                                    <Dropdown.Item>
                                        <div name={nodeName} onClick={(e) => selectNodeType(e)}>
                                            {nodeName}
                                        </div>
                                    </Dropdown.Item>
                                )
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    </Col>
                </Row>
                <Row>
                    <button onClick={(e) => addNode(e)}>Add Node</button>
                </Row>
            </Form>
        </Fragment>
    )
}

Add.propTypes = {
    nodeStructure: PropTypes.array.isRequired,
    updateHasCompiled : PropTypes.func.isRequired,
    changeNodeStructure : PropTypes.func.isRequired,
    setAlert : PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    nodeStructure : state.audioNodeManager.nodeStructure,
});

export default connect(mapStateToProps, {
    updateHasCompiled,
    changeNodeStructure,
    setAlert
})(Add)


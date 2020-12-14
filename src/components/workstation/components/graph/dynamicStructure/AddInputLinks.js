import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup'
import { v4 as uuidv4 } from 'uuid';
import addNode from '../../../../../redux/reducers/addNode';
import {
    addLinkAction,
    removeLinkAction
} from './../../../../../redux/actions/addNode';

/**
 * 
 * @deprecated
 * @desciption DO NOT USE ANYMORE 
 */
const AddInputLinks = ({
    nodeStructure,
    adjacencyList
}) => {


    const addLink = (e) => {
        let nodeName = e.target.name;

        if(!(nodeName in inputLinks)){
            addLinkAction(new uuidv4(), nodeName, null, isInput);       
        }
    }

    return (
        <Fragment>
            {
                <ListGroup>
                {
                    inputLinks.length > 0 ?
                    inputLinks.map(link => (
                    <ListGroup.Item>
                        <div name={link.id} onClick={(e) => removeLink(e)}>
                            { link.name }   
                        </div>
                    </ListGroup.Item>
                    )) :
                    <ListGroup.Item>
                        You've not added any links yet.
                    </ListGroup.Item>
                }
                </ListGroup>
            }
            <Dropdown>
                <Dropdown.Toggle variant="warning" id="dropdown-basic-addInputLinks">
                    Add a link
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {
                        nodeStructure.forEach((item) => {
                            <Dropdown.Item>
                                <div name={item.name} onClick={(e) => addLink(e)}>
                                    {nodeName}
                                </div>
                            </Dropdown.Item>
                        })
                    }
                </Dropdown.Menu>
            </Dropdown>
        </Fragment>
    )
}

AddInputLinks.propTypes = {
    inputLinks : PropTypes.array.isRequired,
    nodeStructure : PropTypes.array.isRequired,
    addLinkAction : PropTypes.func.isRequired,
    removeLinkAction : PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    inputLinks : addNode.inputLinks
});

export default connect(mapStateToProps, {
    addLinkAction,
    removeLinkAction
})(AddInputLinks)

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
import { OUTPUT } from '../../../../storage/Types';
import EntityNodeFactory from '../../../../storage/EntityNodeFactory';

/**
 * 
 * @deprecated
 * @desciption DO NOT USE ANYMORE 
 */
const AddOutputLinks = ({
    nodeStructure,
    outputLinks,
    addLinkAction,
    removeLinkAction
}) => {

    const isInput = false;
    const delimiter = ",";
    
    const removeLink = (e) => {
        removeLinkAction(e.target.name, isInput);
    }

    const hasOutputLinkAlreadyAdded = (nodeName, propertyConnect) => {
        outputLinks.forEach(link => {
            if(link.name == nodeName && link.property == propertyConnect){
                return true;
            }
        });

        return false;
    }

    const addLink = (e) => {
        let nodeName, connect;
        let value = e.target.name;

        if(value.indexOf(delimiter) == -1){
            nodeName = value;
            connect = null;
        }else{
            let nodeNameConnect = e.target.name.split(delimiter);
            nodeName = nodeNameConnect[0];
            connect = nodeNameConnect[1];
        }

        if(hasOutputLinkAlreadyAdded(nodeName, connect)){
            //TODO: Raise error that Output Link already selected
        }else{
            addLinkAction(new uuidv4(), nodeName, connect, isInput);
        }
    }

    return (
        <Fragment>
            {
                <ListGroup>
                {
                    outputLinks.length > 0 ?
                        outputLinks.map(link => (
                        <ListGroup.Item>
                            <div name={link.id} onClick={(e) => removeLink(e)}>
                                { link.name } -&gt; { link.property }
                            </div>
                        </ListGroup.Item>
                        )) :
                        (<ListGroup.Item>
                            You've not added any output links yet.
                        </ListGroup.Item>)
                }
                </ListGroup>
            }
            <Dropdown>
                <Dropdown.Toggle variant="warning" id="dropdown-basic-addOutputLinks">
                    Add a link
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {
                        nodeStructure.forEach((item) => {
                            {/* The First Dropdown Item is to connect to the node itself, and not any of its properties */}
                            (
                            <Dropdown.Item>
                                <div name={item.name}  onClick={(e) => addLink(e)}>
                                    {item.Name} 
                                </div>
                            </Dropdown.Item>
                            )

                            {/* The Next Dropdown Items are for connecting to the node's properties */}
                            EntityNodeFactory.getAvailableConnectsForAudioNodeType(item.type).forEach(connect => {
                                return <Dropdown.Item>
                                            <div name={item.name.concat(delimiter, connect)}  onClick={(e) => addLink(e)}>
                                                {item.Name} -&gt; {connect}
                                            </div>
                                        </Dropdown.Item>
                            })
                        })
                    }
                    {
                        /* The Next Dropdown Item is for connecting to the OUTPUT */
                        (
                        <Dropdown.Item>
                            <div name={OUTPUT} onClick={(e) => addLink(e)}>
                                {OUTPUT}
                            </div>
                        </Dropdown.Item>
                        )
                    }
                </Dropdown.Menu>
            </Dropdown>
            {
                <Dropdown>
                    <Dropdown.Toggle variant="warning" id="dropdown-basic-addOutputLinks">
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
            }
        </Fragment>
    )
}

AddOutputLinks.propTypes = {
    outputLinks : PropTypes.array.isRequired,
    addLinkAction : PropTypes.func.isRequired,
    removeLinkAction : PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    outputLinks : addNode.outputLinks
});

export default connect(mapStateToProps, {
    addLinkAction,
    removeLinkAction
})(AddOutputLinks)

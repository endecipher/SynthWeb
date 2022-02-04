import React, { useState, useRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import AddNode from './dynamicStructure/AddNode';
import DeleteNode from './dynamicStructure/DeleteNode';
import AddLink from './dynamicStructure/AddLink';
import DeleteLink from './dynamicStructure/DeleteLink';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const DynamicNodeChanger = ({
    anm
}) => {

    const panelChoices = useRef(Object.freeze({
        ADD_NODE : 1,
        DELETE_NODE : 2,
        ADD_LINK : 3,
        DELETE_LINK : 4,
        EMPTY  : 5
    }));

    const [overlayType, changeOverlay] = useState(panelChoices.current.EMPTY);
    const [panelValue, changePanelValue] = useState(panelChoices.current.EMPTY);
    const [isPanelActive, shouldShowPanel] = useState(false);

    const addNode = (e) => {
        changePanelValue(panelChoices.current.ADD_NODE);
        shouldShowPanel(true);
    }

    const deleteNode = (e) => {
        changePanelValue(panelChoices.current.DELETE_NODE);
        shouldShowPanel(true);
    }

    const addLink = (e) => {
        changePanelValue(panelChoices.current.ADD_LINK);
        shouldShowPanel(true);
    }

    const deleteLink = (e) => {
        changePanelValue(panelChoices.current.DELETE_LINK);
        shouldShowPanel(true);
    }
    
    const cancelChanges = (e) => {
        changePanelValue(panelChoices.current.EMPTY);
        shouldShowPanel(false);
        //TODO: Add alerts if user is confused.
    }

    const getText = () => {
        switch(overlayType){
            case panelChoices.current.ADD_NODE:
                return "Add a node";
            default:
                return "Yet to"
        }
    }

    return (
        <Fragment>
            <hr/>
            {/* TODO: Replace with fas icons and style properly, maybe use React-Bootstrap */}
            <div className="hoverOverEverything">
                {
                    panelValue == panelChoices.current.EMPTY 
                        ? (
                            <Fragment>
                            <OverlayTrigger
                                key="overlay"
                                placement="top"
                                overlay={
                                    <Tooltip id={`tooltip-top`}>
                                        Tooltip on <strong>{getText()}</strong>.
                                    </Tooltip>
                                }
                                >
                            <ButtonGroup toggle>
                                <Button
                                    key="addNode"
                                    variant="secondary"
                                    name="addNode"
                                    onClick={(e) => addNode(e)}
                                    onMouseEnter={(e) => {changeOverlay(panelChoices.current.ADD_NODE)}}
                                    onMouseLeave={(e) => {changeOverlay(panelChoices.current.EMPTY)}}
                                >
                                    <i className="fa fa-plus"></i>
                                </Button>
                                <Button
                                    key="deleteNode"
                                    variant="secondary"
                                    name="deleteNode"
                                    onClick={(e) => deleteNode(e)}
                                >
                                    <i className="fa fa-minus"></i>
                                </Button>
                                <Button
                                    key="addLink"
                                    variant="secondary"
                                    name="addLink"
                                    onClick={(e) => addLink(e)}
                                >
                                    <i className="fa fa-link"></i>
                                </Button>
                                <Button
                                    key="deleteLink"
                                    variant="secondary"
                                    name="deleteLink"
                                    onClick={(e) => deleteLink(e)}
                                >
                                    <i className="fa fa-unlink"></i>
                                </Button>
                            </ButtonGroup>
                            </OverlayTrigger>
                            </Fragment>
                        ) :
                        (
                            <Fragment>
                                <button onClick={(e) => cancelChanges(e)}>X</button>
                            </Fragment>
                        )
                }
            </div>
            <Fragment>
                {
                    !isPanelActive
                        ? <Fragment/> : 
                    panelValue == panelChoices.current.ADD_NODE
                        ? (
                            <Fragment>
                                <AddNode/>
                            </Fragment>
                        ) :
                    panelValue == panelChoices.current.DELETE_NODE
                        ? (
                            <Fragment>
                                <DeleteNode/>
                            </Fragment>
                        ) : 
                    panelValue == panelChoices.current.ADD_LINK
                        ? (
                            <Fragment>
                                <AddLink anm={anm}/>
                            </Fragment>
                        ) :
                    panelValue == panelChoices.current.DELETE_LINK
                        ? (
                            <Fragment>
                                <DeleteLink/>
                            </Fragment>
                        ) : 
                    <Fragment/>
                }
            </Fragment>
        </Fragment>
    )
}

DynamicNodeChanger.propTypes = {
    anm : PropTypes.object.isRequired,
}

export default DynamicNodeChanger

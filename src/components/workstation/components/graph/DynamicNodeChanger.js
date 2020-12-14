import React, { useState, useRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import AddNode from './dynamicStructure/AddNode';
import DeleteNode from './dynamicStructure/DeleteNode';
import AddLink from './dynamicStructure/AddLink';
import DeleteLink from './dynamicStructure/DeleteLink';

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

    return (
        <Fragment>
            {/* TODO: Replace with fas icons and style properly, maybe use React-Bootstrap */}
            <Fragment>
                {
                    panelValue == panelChoices.current.EMPTY 
                        ? (
                            <Fragment>
                                <button onClick={(e) => addNode(e)}>+</button>
                                <button onClick={(e) => deleteNode(e)}>-</button>
                                <button onClick={(e) => addLink(e)}>&lt;+&gt;</button>
                                <button onClick={(e) => deleteLink(e)}>&lt;-&gt;</button>
                            </Fragment>
                        ) :
                        (
                            <Fragment>
                                <button onClick={(e) => cancelChanges(e)}>X</button>
                            </Fragment>
                        )
                }
            </Fragment>
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
                                <AddLink/>
                            </Fragment>
                        ) :
                    panelValue == panelChoices.current.DELETE_NODE
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

import {
    removeActiveStateDetailsAction
} from './activeState';
import {
    updateHasColdStarted,
    updateHasCompiled,
    updateHasValuesChanged,
    updateShowKeyboard
} from './values';
import {
    changeNodeStructure,
    changeAdjacencyList
} from './audioNodeManager';

export const exploreDefault = (NodeStructure, AdjacencyList) => dispatch => {
    updateHasColdStarted(false)(dispatch);
    changeNodeStructure(NodeStructure)(dispatch);
    changeAdjacencyList(AdjacencyList)(dispatch);
    updateHasValuesChanged(false)(dispatch);
    removeActiveStateDetailsAction()(dispatch);
    updateShowKeyboard(true)(dispatch);
    updateHasCompiled(true)(dispatch);
}

export const compile = (NodeStructure, AdjacencyList) => dispatch => {
    changeNodeStructure(NodeStructure)(dispatch);
    changeAdjacencyList(AdjacencyList)(dispatch);
    updateHasValuesChanged(false)(dispatch);
    removeActiveStateDetailsAction()(dispatch);
    updateShowKeyboard(true)(dispatch);
    updateHasCompiled(true)(dispatch);
}
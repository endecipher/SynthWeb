import {
    CHANGE_ANM_ADJACENCYLIST, 
    CHANGE_ANM_NODESTRUCTURE,
} from '../types';

/**
 * Dispatches via Thunk the supplied nodeStructure to change
 * @param {Array} nodeStructure 
 */
export const changeNodeStructure = (nodeStructure) => dispatch => {
    dispatch({
        type: CHANGE_ANM_NODESTRUCTURE,
        payload: {
            nodeStructure : nodeStructure
        }
    });
};

/**
 * Dispatches via Thunk the supplied adjacencyList to change
 * @param {Array} adjacencyList 
 */
export const changeAdjacencyList = (adjacencyList) => dispatch => {
    dispatch({
        type: CHANGE_ANM_ADJACENCYLIST,
        payload: {
            adjacencyList : adjacencyList
        }
    });
};

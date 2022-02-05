import {
    CHANGE_ANM_ADJACENCYLIST, 
    CHANGE_ANM_NODESTRUCTURE,
} from '../types';

const initialState = {
    nodeStructure : [],
    adjacencyList : [],
}

export default function(state = initialState, action){
    const { type, payload } = action;

    console.log(`Accessed AudioNodeManagerReducer> Type: ${type} Payload: ${payload}`);

    switch(type){
        case CHANGE_ANM_NODESTRUCTURE:
            return {
                ...state,
                nodeStructure : payload.nodeStructure ?? []
            };
        case CHANGE_ANM_ADJACENCYLIST:
            return {
                ...state,
                adjacencyList : payload.adjacencyList ?? []
            };
        default:
            return state;
    }
};
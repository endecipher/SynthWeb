import {
    CHANGE_ACTIVE_STATE, REMOVE_ACTIVE_STATE
} from '../types';

const initialState = {
    details : null
}

export default function(state = initialState, action){
    const { type, payload } = action;

    console.log(`Accessed ActiveStateReducer> Type: ${type} Payload: ${payload}`); //TODO: Remove Logs

    switch(type){
        case CHANGE_ACTIVE_STATE:
            return {
                ...state,
                details : payload.details
            };
        case REMOVE_ACTIVE_STATE:
            return {
                ...state,
                details : null
            };
        default:
            return state;
    }
};
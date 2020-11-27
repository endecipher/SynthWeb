import {
    CHANGE_FX_STATE_ORDER, COMPILING, COMPILED, CHANGE_GLOBAL_ORDER
} from '../types';
import {
    FX1, FX2
} from '../../components/storage/Types';

const initialState = {
    stateOrder : {
        [FX1] : null,
        [FX2] : null
    },
    mixer : {

    },
    isCompiled : false,
}

const changeOrder = (state, payload) => {
    const { FxChainId, newState } = payload;

    switch(FxChainId){
        case FX1:
            return {
                ...state.stateOrder,
                [FX1] : newState
            };
        case FX2:
            return {
                ...state.stateOrder,
                [FX2] : newState
            };
        default : 
            return {
                ...state.stateOrder
            };
    }
}

export default function(state = initialState, action){
    const { type, payload } = action;

    console.log(`Reducing AudioNodeManager Type: ${type} Payload: ${payload}`); //TODO: Remove Logs

    switch(type){
        case CHANGE_GLOBAL_ORDER:
            return {
                ...state,
                stateOrder : payload.newStateOrder
            };
        case CHANGE_FX_STATE_ORDER:
            return {
                ...state,
                stateOrder : changeOrder(state, payload)
            };
        case COMPILING:
            return {
                ...state,
                isCompiled: false
            };
        case COMPILED:
            return {
                ...state,
                isCompiled: true
            };
        default:
            return state;
    }
};
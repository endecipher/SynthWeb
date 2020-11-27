import { CHANGE_FX_STATE_ORDER, COMPILED, COMPILING, CHANGE_GLOBAL_ORDER } from '../types'

export const changeGlobalStateOrder = (newStateOrder) => dispatch => {
    dispatch({
        type: CHANGE_GLOBAL_ORDER,
        payload: {
            newStateOrder
        }
    });
};

export const changeStateOrder = (FxChainId, newState) => dispatch => {
    dispatch({
        type: CHANGE_FX_STATE_ORDER,
        payload: {
            FxChainId,
            newState
        }
    });
};

//For Performance, we can make compiling happen for a single FxChain
export const compileEverything = () => dispatch => {
    dispatch({
        type: COMPILING,
        payload: {
            
        }
    });
};

//For Performance, we can make compiling happen for a single FxChain
export const compilationDone = () => dispatch => {
    dispatch({
        type: COMPILED,
        payload: {
            
        }
    });
};

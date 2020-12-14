import { 
    ATTACH_NODE_INPUT_LINK,
    ATTACH_NODE_OUTPUT_LINK,
    DETACH_NODE_INPUT_LINK,
    DETACH_NODE_OUTPUT_LINK,
    CLEAR_ALL
} from '../types'

const initialState = {
    inputLinks : [],
    outputLinks : []
};

export default function(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case ATTACH_NODE_INPUT_LINK:
            return {
                ...state,
                inputLinks : state.inputLinks.unshift(payload)
            };
        case ATTACH_NODE_OUTPUT_LINK:
            return {
                ...state,
                outputLinks : state.outputLinks.unshift(payload)
            };
        case DETACH_NODE_INPUT_LINK:
            return {
                ...state,
                inputLinks : state.inputLinks.filter(x=> x.id !== payload)
            };
        case DETACH_NODE_OUTPUT_LINK:
            return {
                ...state,
                outputLinks : state.outputLinks.filter(x=> x.id !== payload)
            };
        case CLEAR_ALL:
            return {
                ...state,
                inputLinks : [],
                outputLinks : []
            }
        default:
            return state; 
    }
}
import { 
    ATTACH_NODE_INPUT_LINK,
    ATTACH_NODE_OUTPUT_LINK,
    DETACH_NODE_INPUT_LINK,
    DETACH_NODE_OUTPUT_LINK,
    CLEAR_ALL
} from '../types'

/**
 * 
 * @param {String} id 
 * @param {String} nodeName 
 * @param {String} property 
 * @param {Boolean} isInput 
 */
export const addLinkAction = (id, nodeName, property, isInput) => dispatch => {
    dispatch({
        type: isInput ? ATTACH_NODE_INPUT_LINK : ATTACH_NODE_OUTPUT_LINK,
        payload: {
            id,
            nodeName, 
            property : isInput ? null : property
        }
    });
};

export const removeLinkAction = (id, isInput) => dispatch => {
    dispatch({
        type: isInput ? DETACH_NODE_INPUT_LINK : DETACH_NODE_OUTPUT_LINK,
        payload : id
    });
};

export const clearAllNodeAdditionDetails = () => dispatch => {
    dispatch({
        type: CLEAR_ALL,
        payload : null
    });
}
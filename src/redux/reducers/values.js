import { 
    SET_HAS_COLD_STARTED_FALSE,
    SET_HAS_COLD_STARTED_TRUE,
    SET_HAS_COMPILED_FALSE,
    SET_HAS_COMPILED_TRUE,
    SET_HAS_VALUES_CHANGED_FALSE,
    SET_HAS_VALUES_CHANGED_TRUE,
    SET_SHOW_KEYBOARD_FALSE,
    SET_SHOW_KEYBOARD_TRUE
} from '../types'

const initialState = {
    hasColdStarted : true,
    showKeyboard : false,
    hasValuesChanged : true,
    hasCompiled: false,
}

export default function(state = initialState, action){
    const { type } = action;

    console.log(`Accessed ValuesReducer> Type: ${type} `); //TODO: Remove Logs

    switch(type){
        case SET_SHOW_KEYBOARD_TRUE:
            return {
                ...state,
                showKeyboard : true
            };
        case SET_SHOW_KEYBOARD_FALSE:
            return {
                ...state,
                showKeyboard : false
            }; 
        case SET_HAS_VALUES_CHANGED_TRUE:
            return {
                ...state,
                hasValuesChanged : true
            };
        case SET_HAS_VALUES_CHANGED_FALSE:
            return {
                ...state,
                hasValuesChanged : false
            }; 
        case SET_HAS_COMPILED_TRUE:
            return {
                ...state,
                hasCompiled : true
            };
        case SET_HAS_COMPILED_FALSE:
            return {
                ...state,
                hasCompiled : false
            }; 
        case SET_HAS_COLD_STARTED_TRUE:
            return {
                ...state,
                hasColdStarted : true
            };
        case SET_HAS_COLD_STARTED_FALSE:
            return {
                ...state,
                hasColdStarted : false
            }; 
        default:
            return state;
    }
};
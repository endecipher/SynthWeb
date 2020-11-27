import { combineReducers } from 'redux';
import alert from '../reducers/alert';
import audioNodeManager from '../reducers/audioNodeManager';

export default combineReducers({
    alert,
    audioNodeManager
});
import { combineReducers } from 'redux';
import alert from '../reducers/alert';
import activeState from '../reducers/activeState';
import audioNodeManager from '../reducers/audioNodeManager';
import addNode from './../reducers/addNode';
import values from './values';

export default combineReducers({
    alert,
    audioNodeManager,
    activeState,
    values,
    addNode
});
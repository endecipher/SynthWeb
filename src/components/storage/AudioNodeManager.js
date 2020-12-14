import BaseContext from './BaseContext';
import { Initialize } from './nodemanager/InitializeNodeManager';
import EntityNode from './EntityNode';
import { 
    ThrowNodeChangeStateFailedException,
    ThrowFetchActiveStateFailedException,
    ThrowAudioNodeManagerInitializationException
} from '../../static/Errors';
import InputManager from './InputManager';
import GraphInfoManager from './GraphInfoManager';

export default class AudioNodeManager {

    constructor() {
        this.Context = new BaseContext();

        /**
         * @type {Map<string, EntityNode>} Key: unique name as string Value: EntityNode 
         */
        this.NodeMap = new Map();

        /**
         * @type {Array} Holds the entire Node Structure
         */
        this.NodeStructure = [];

        /**
         * @type {Array} Holds the entire AdjacencyList
         */
        this.AdjacencyList = [];

        this.GraphInfoManager = new GraphInfoManager();
        this.InputManager = new InputManager();
    }
  
    /**
     * Initializes Audio Manager from scratch. 
     * @param {Array} NodeStructure 
     * @param {Array} AdjacencyList 
     */
    initializeAudioNodeManager(NodeStructure = [], AdjacencyList = []){
        try{
            return Initialize(this, {
                NodeStructure,
                AdjacencyList
            });
        }catch(err){
            ThrowAudioNodeManagerInitializationException(err);
        }
    }

    /**
     * Returns the current Information Structure from ANM. 
     * @returns {{NodeStructure : Array, AdjacencyList : Array}}
     */
    getInformationStructure(){
        return {
            NodeStructure : this.NodeStructure,
            AdjacencyList : this.AdjacencyList
        };
    }

    /**
     * Returns the current Graphical Information Structure from ANM. 
     * @returns {{nodes : Array, links : Array}}
     */
    getGraphicalData(){
        return this.GraphInfoManager.getGraphicalData();
    }

    /**
     * Returns the current Graphical Information Manager. 
     * @returns {GraphInfoManager}
     */
    getGraphicalInfoManager(){
        return this.GraphInfoManager;
    }

    /**
     * The Node Value Changer will call this. It has gotten the changed activeState.details from Redux store.
     * @param {Object} activeStateDetails 
     */
    changeNodeValues(activeStateDetails){
        try{
            const { name } = activeStateDetails;
            this.NodeMap.get(name).performFunction((node) => {
                node.changeStateDetails(activeStateDetails);
            })
        }catch(err){
            ThrowNodeChangeStateFailedException(err);
        }
    }

    /**
     * Fetches the active state details of the supplied node Name
     * @param {string} nodeName 
     * @returns {Object} activeStateDetails
     */
    fetchNodeActiveState(nodeName){
        try{
            return this.NodeMap.get(nodeName).fetchDetails();
        }catch(err){
            ThrowFetchActiveStateFailedException(err);
        }
    }    


    /**
     * To be fired from the Keyboard
     * @todo Create an Observer pattern. Have AudioNodeManager store an array of functions to perform whenever startAll is played.
     * @param {Object} keyboardInputs 
     */
    play(freq){
        this.InputManager.addFrequency(freq);
    }

    /**
     * Stops all Inputs with the freq
     */
    stop(freq){
        this.InputManager.removeFrequency(freq);
    }

    /**
     * forceStops all playable actions.
     * @description Mostly used when triggered from InputCutoff on ShowKeyboard false
     */
    forceStop(){
        this.InputManager.forceStop();
    }

    /**
     * Clear everything
     */
    demolish(){
        this.GraphInfoManager = null;
        this.InputManager = null;
        this.NodeMap.clear();
        this.NodeStructure.length = 0;
        this.AdjacencyList.length = 0;
    }
}
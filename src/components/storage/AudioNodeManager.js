import BaseContext from './BaseContext';
import { Initialize } from './nodemanager/InitializeNodeManager';
import { 
    ThrowNodeChangeStateFailedException
} from '../../static/Errors';
import InputManager from './InputManager';
import GraphInfoManager from './GraphInfoManager';
import Logger from '../../static/Logger';
import { ERROR } from '../../redux/actions/alert';
import EntityNode from './EntityNode';

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

            const informationStructure = {
                NodeStructure,
                AdjacencyList
            };

            return Initialize(this, informationStructure);
        }catch(err){
            return {
                hasCompilationFailed : true,
                messages : [{
                    msg: err,
                    type: ERROR
                }]
            };
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
     * Change the state details and node Structure on property value change.
     * Returns the updated NodeStructure
     * @param {Object} activeStateDetails 
     * @returns {Array} 
     */
    changeNodeValues(activeStateDetails){
        try{
            const { name } = activeStateDetails;

            /**
             * @type {EntityNode} EntityNode
             */
            let entityNode = this.NodeMap.get(name);

            entityNode.performFunction((node) => {
                node.changeStateDetails(activeStateDetails);
            });

            this.NodeStructure[entityNode.getIndex()].properties = activeStateDetails.properties;

            return this.NodeStructure;
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
            Logger.LogInfo(`NodeMap doesn't have the node with name ${nodeName} : ${err}`);
            return null;
        }
    }    


    /**
     * To be registered from the Keyboard
     * @param {(freq) => void} func 
     */
    addKeyboardCallback(func){
        this.InputManager.addKeyDisplayFunc(func);
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
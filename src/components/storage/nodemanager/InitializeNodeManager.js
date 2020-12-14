import AudioNodeManager from './../AudioNodeManager';
import { ThrowAudioNodeManagerInitializationException } from './../../../static/Errors';
import EntityNodeFactory from './../EntityNodeFactory';
import { OUTPUT } from '../Types';
import Validator from './Validator';
import EntityManager from './EntityManager';
import GraphInfoManager from '../GraphInfoManager';
import InputManager from '../InputManager';
import Logger from '../../../static/Logger';

/**
 * @todo Expose Functionality for Redux State and User Input state for their graphs
 * @param {AudioNodeManager} anm
 * @param {{NodeStructure : Array<Object> , AdjacencyList : Array<Object> }} informationStructure 
 * @returns {{ hasCompilationFailed : Boolean, messages : Array<{msg : String, type : "ERROR" | "WARNING"}>}} { hasCompilationFailed : Boolean, }
 */
export const Initialize = (anm, informationStructure = null) => {

    if(!(anm instanceof AudioNodeManager)){
        ThrowAudioNodeManagerInitializationException();
    }

    Logger.LogInfo(`Starting ANM Initialization. Init Structure... `);

    const structure = Validator.ValidateStructure(informationStructure);
    
    if(!structure){
        Logger.LogInfo(`Structure Format Invalid! `)
        return validator.GetMessages();
    }
    
    Logger.LogInfo(`Information Structure Format Validated. `);
    
    const entityManager = new EntityManager();
    const graphInfoManager = new GraphInfoManager();
    const inputManager = new InputManager();
    const validator = new Validator(entityManager, graphInfoManager);

    Logger.LogInfo(`Populating valid NodeStructure and NodeMap... `);
    structure.NodeStructure.forEach((item, index) => {

        if(validator.IsValidNodeEntity(item, index)){
            let entityNode = EntityNodeFactory.createNode(anm.Context)(item);

            //Add EntityNode to NodeMap
            entityManager.NodeMap.set(item.name, entityNode);

            //Add Unique Name for Graph Plotting
            graphInfoManager.addNewGraphNode(item.name);

            //Check for Playable Inputs
            let playableInfo = entityNode.getPlayableInfo();
            if(playableInfo){
                inputManager.addPlayableFunction(playableInfo[0]);
                inputManager.addStoppableFunction(playableInfo[1]);
            }

            entityManager.NodeStructure.push(item);
        }
    });

    //Add Output Node to Graphical Information
    graphInfoManager.addNewGraphNode(OUTPUT);
    
    Logger.LogInfo(`Validating AdjacencyList using NodeStructure and NodeMap... `);
    structure.AdjacencyList.forEach((adjacency, index) => {

        const from  = adjacency.from;

        if(validator.IsFromValidAdjacency(from))
        {
            const {
                name : fromNodeName,
                property : fromProperty
            } = from;

            let currentEntity = entityManager.NodeMap.get(fromNodeName).getNodeToConnect(fromProperty);

            let validConnectToes = [];

            adjacency.to.forEach((to, index) => {

                if(validator.IsToValidAdjacency(from, to)){
                    const {
                        name : toNodeName,
                        property : toProperty
                    } = to;

                    if(toNodeName === OUTPUT){
                        currentEntity.connect(anm.Context.getAudioContext().destination);
                    }else{
                        currentEntityNode.connect(entityManager.NodeMap.get(toNodeName).getNodeToConnect(toProperty));
                    }

                    graphInfoManager.addNewGraphLinkInfo(fromNodeName, toNodeName, fromProperty, toProperty);

                    validConnectToes.push(to);
                }
    
            });

            if(validConnectToes.length > 0){
                entityManager.AdjacencyList.push({
                    ...adjacency,
                    to : validConnectToes
                });
            }
        }
    });

    if(validator.IsCompilationSuccessul()){
        Logger.LogInfo(`Clearing ANM...`);
        anm.demolish();

        Logger.LogInfo(`ANM Cleared! Setting Valid Entities`);
        
        anm.NodeStructure = entityManager.NodeStructure;
        anm.AdjacencyList = entityManager.AdjacencyList;
        anm.NodeMap = entityManager.NodeMap;
        anm.InputManager = inputManager;
        anm.GraphInfoManager = graphInfoManager;

        Logger.LogInfo('Initialized successfully! ');
    }else{
        Logger.LogInfo('Some error occurred. ');
    }

    return validator.GetMessages();
}



    //This structure will eventually be changed by the user inputs
    //There will be no mentality of individual React components for each count and type of node..

    //The Keyboard is the only things which will fire Key Handlers.
    //Based on those, the starting oscillators will play.

    //Therefore, in a way, each AudioNode wrapper classes will need to carry a state, so that when 
    //dumb components request the ANM via a name, in O(1) the resultant state should be given

    //Changing values of an AudioNode's state shouldn't cause a compilation.
    //It's changing the AdjacencyList/NodeStructure ; so that connections can be remade. 

    //Redux should store the NodeStructure and Adjacency List and also, a component should subscribe to
    //this part of the the state (i.e the adjacency list) so that whenever it changes from the User Graph
    //, the re-compilation should be able to fire. 

    //If a suser wants to change the properties of an Audio Node, like changin a Gain which he added,
    //Then it's apparent that On clicking on that graph node, we will be able to toggle the visibility
    //Of a component. (i.e dispatch a state change to redux fetching the current state from ANM)
    //To toggle the visibility of that component, There should be a redux state called active : 
    // { name: GAINONE } that remains null if Keyboard is shown and if the state changes, the componenet shows up
    //rendering the state of the named AudioNode. It should contain the properties also.
    //However, again this won't trigger a re-render
    /*
        active : {
            name : UserGivenName,
            type : Oscillator,
            description : "Some desciption"
            properties : {
                gain: 20,
                linearRampValue:
                linearRampDifference:
            }
        }

        The question is, do we need a UUID?
        Really though, I don't think So for now. 

        //Any properties mentioned need to be exposed by the Audio Node, and during Connect,
        // we should make sure that if an audio node needs to connect not to the node, but 
        // a property of the node for modulation, we should be able to do it

    */
    //Make OUTPUT Node constant
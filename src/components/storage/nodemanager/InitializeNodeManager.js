import AudioNodeManager from './../AudioNodeManager';
import { ThrowAudioNodeManagerInitializationException } from './../../../static/Errors';
import Structure from './Structure';
import EntityNodeFactory from './../EntityNodeFactory';
import { OUTPUT } from '../Types';
/**
 * @todo Expose Functionality for Redux State and USer Input state for their graphs
 * @param {AudioNodeManager} anm
 * @param {Object} informationStructure 
 */
export const Initialize = (anm, informationStructure = null) => {

    if(!(anm instanceof AudioNodeManager)){
        ThrowAudioNodeManagerInitializationException();
    }

    //Set NodeStructure and AdjacencyList to ANM if proper. 
    //Do a shallow check of current and new input NodeStructure
    // (for keys, not values) has changed in ANM for validating structure again

    //Do the same for AdjacencyList, and if has changed call Initialize again
    const structure = ValidateStructure(informationStructure);

    anm.NodeStructure = structure.NodeStructure; //Array 
    anm.AdjacencyList = structure.AdjacencyList; //Array

    console.log(`Working Initialization ANM. Init Structure ${structure}`);

    //Clear
    anm.NodeMap.clear();
    anm.GraphNodes.length = 0;
    anm.GraphLinks.length = 0;

    //Set NodeMap
    anm.NodeStructure.forEach((item, index) => {
        anm.NodeMap.set(item.name, EntityNodeFactory.createNode(anm.Context)(item));
        anm.GraphNodes.unshift({
            id : item.name
        });
    });

    anm.GraphNodes.unshift({
        id : OUTPUT
    });

    //Connect New Nodes inside the NodeMap
    anm.AdjacencyList.forEach((item, index) => {
        let nodeName = Object.keys(item)[0];

        let currentEntityNode = anm.NodeMap.get(nodeName);

        item[nodeName].forEach((toConnectItem, toConnectIndex) => {
            const {
                name, property
            } = toConnectItem;

            if(name === OUTPUT){
                currentEntityNode.connectTo()(anm.Context.getAudioContext().destination);
            }else{
                let toConnectNode = anm.NodeMap.get(name);
                currentEntityNode.connectTo()(toConnectNode.getNodeToConnect(property));
            }

            anm.GraphLinks.unshift({
                source : nodeName,
                target : name
            });
        });
    });

    console.log('Initialized successfully!');
}

/**
 * 
 * @param {Object} informationStructure Complex Object describing the NodeStructure and AdjacencyList
 * @returns {Structure} A New structure with Validations
 */
export const ValidateStructure = (informationStructure) => {
    try{
        if(informationStructure)
        {
            const {
                NodeStructure,
                AdjacencyList
            } = informationStructure;

            if(NodeStructure.length > 0 && AdjacencyList.length > 0){
                return new Structure(NodeStructure, AdjacencyList);
            }else{
                return new Structure();
            }
        }else
        {
            return new Structure();
        }
    }
    catch(err)
    {
        ThrowAudioNodeManagerInitializationException(err);
    }
}

//To be fed to Initialize late run so that it 
    //doesn't depend on a static structure.
    //This structure will eventually be changed by the user inputs
    //There will be no mentality of individual React components for each count and type of node..

    //They Keyboard is the only things which will fire Key Handlers.
    //Based on those, the starting oscillators will play.

    //Therefore, in a way, each AudioNode wrapper classes will need to carry a state, so that when 
    //dumb components request the ANM via a name, in O(1)  the resultant state should be given

    //Changing values of an AudioNode's state shouldn't cause a compilation.
    //
    //It's changing the Adjacency list ; so that connections can be remade. 

    //Redux should store the state values of all the nodes, (Apart from the ones which will change
    //on the Keyboard's command)
    //Redux should also store the Adjacency List and also, a component should subscribe to
    //this part of the the state (i.e the adjacency list) so that whenever it changes from the User Graph
    //, the re-compilation should be able to fire. (Probably the Keyboard component, because, we won't allow users
    //to play the Keyboard and start the root oscillators, if the compilation is not done.)

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
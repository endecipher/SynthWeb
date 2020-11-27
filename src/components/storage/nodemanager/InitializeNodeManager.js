import AudioNodeManager from './../AudioNodeManager';
import { ThrowAudioNodeManagerInitializationException } from './../../../static/Errors';
import Structure from './Structure';
/**
 * 
 * @param {AudioNodeManager} anm 
 */
export const Initialize = (anm) => {

    if(!(anm instanceof AudioNodeManager)){
        ThrowAudioNodeManagerInitializationException();
    }

    const structure = new Structure();

    console.log(`Working Initialization ANM. Init Structure ${structure}`);

    const nodes = structure.NodeStructure; //Array 
    const adjacencyList = structure.AdjacencyList; //Array

    nodes.forEach((item, index) => {
        console.log(`${index} ${item}`);
    })

}


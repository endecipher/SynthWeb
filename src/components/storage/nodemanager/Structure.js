import { InitialNodeStructure, InitialAdjacencyList } from '../../../static/initialization/InitialState';

export default class Structure{

    // initialNodeStructure = [
    //     {
    //         name: "OSC1",
    //         type: PLAYABLE_OSCILLATOR,
    //         description: "My starting Oscillator",
    //         properties: {
    //             type: OSC_TYPE_TRIANGLE, 
    //             frequency: 130.8,
    //             detune: 0,
    //             //Any other properties
    //         }
    //     },
    //     {
    //         name: "OSC2",
    //         type: PLAYABLE_OSCILLATOR,
    //         description: "My second starting Oscillator",
    //         properties: {
    //             type: OSC_TYPE_SINE, 
    //             frequency: 400.8,
    //             detune: 0,
    //             //Any other properties
    //         }
    //     },
    //     {
    //         name: "OSC1Gain",
    //         type: GAIN,
    //         description: "My Oscillator Gain",
    //         properties: {
    //             gain: 100
    //             //Any other properties
    //         }
    //     },
    //     {
    //         name: "OSC2Gain",
    //         type: GAIN,
    //         description: "My Oscillator2 Gain",
    //         properties: {
    //             gain: 50
    //             //Any other properties
    //         }
    //     }
    // ]

    // initialAdjacencyList = [
    //     {
    //         from  : {
    //             name : "OSC1",
    //             property : null
    //         },
    //         to : [ 
    //             {
    //                 name : "OSC1Gain",
    //                 property : null //Is Property is null, it's connecting to the node
    //             }
    //         ]
    //     },
    //     {
    //         from : {
    //             name : "OSC2",
    //             property : null
    //         },
    //         to : [ 
    //             {
    //                 name : "OSC2Gain",
    //                 property : null 
    //             }
    //         ]
    //     },
    //     {
    //         from : {
    //             name : "OSC1Gain",
    //             property : null
    //         },
    //         to : [
    //             {
    //                 name : OUTPUT,
    //                 property : null 
    //             }
    //         ]
    //     },
    //     {
    //         from : {
    //             name : "OSC2Gain",
    //             property : null
    //         },
    //         to : [
    //             {
    //                 name : OUTPUT,
    //                 property : null 
    //             }
    //         ]
    //     }
    // ];

    /**
     * 
     * @param {Array} NodeStructure 
     * @param {Array} AdjacencyList
     * @returns A Structure Object containing validated inputs
     * @description Should be encased with try-catch wherever initialied, so that Validation could throw error
     */
    constructor(NodeStructure = null, AdjacencyList = null){
        this.NodeStructure = NodeStructure ?? InitialNodeStructure;
        this.AdjacencyList = AdjacencyList ?? InitialAdjacencyList;
        
        this.ValidateInputs(this.NodeStructure, this.AdjacencyList);

        console.log(`Fetched Node State Array[]: ${this.NodeStructure}`);
        console.log(`Fetched Adjacency List Array[]: ${this.AdjacencyList}`);
    }

    /**
     * @todo Throw Exceptions for the following:
     * 1) Check if any of them are empty or having missing keys (ex: type is not given)
     * 2) If Adjacency List mentions invalid property keys or values, (Negative Integers/Bad Strings etc)
     * 3) Basically make sure eveything the format and data-types are okay in a nutshell, since external user input will be scanned
     * @param {Array} NodeStructure 
     * @param {Array} AdjacencyList 
     */
    ValidateInputs(NodeStructure, AdjacencyList){
        
    }
}
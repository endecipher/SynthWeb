import { ThrowUnidentifiedFXChainKeyException } from '../../../static/Errors';
import {
    OSCILLATOR,
    PLAYABLE_OSCILLATOR,
    CONVOLVER,
    DELAY,
    DYNAMICSCOMPRESSOR,
    GAIN,
    STEREOPANNER,
    WAVESHAPER,
    ANALYSER,
    OSC_TYPE_TRIANGLE,
    OSC_TYPE_SINE,
    OSC_TYPE_SQUARE,
    LFO_OSCILLATOR,
    OUTPUT,
} from '../Types';

export default class Structure{

    initialNodeStructure = [
        {
            name: "OSC1",
            type: PLAYABLE_OSCILLATOR,
            description: "My starting Oscillator",
            properties: {
                type: OSC_TYPE_TRIANGLE, 
                frequency: 130.8,
                detune: 0,
                //Any other properties
            }
        },
        {
            name: "OSC2",
            type: PLAYABLE_OSCILLATOR,
            description: "My second starting Oscillator",
            properties: {
                type: OSC_TYPE_SINE, 
                frequency: 400.8,
                detune: 0,
                //Any other properties
            }
        },
        {
            name: "OSC1Gain",
            type: GAIN,
            description: "My Oscillator Gain",
            properties: {
                gain: 100
                //Any other properties
            }
        },
        {
            name: "OSC2Gain",
            type: GAIN,
            description: "My Oscillator2 Gain",
            properties: {
                gain: 50
                //Any other properties
            }
        }
    ]

    initialAdjacencyList = [
        {
            "OSC1" : [ 
                {
                    name : "OSC1Gain",
                    property : null //Is Property is null, it's connecting to the node
                } 
            ]
        },
        {
            "OSC2" : [ 
                {
                    name : "OSC2Gain",
                    property : null
                } 
            ]
        },
        {
            "OSC1Gain" : [
                {
                    name : OUTPUT,
                    property : null
                }
            ]
        },
        {
            "OSC2Gain" : [
                {
                    name : OUTPUT,
                    property : null
                }
            ]
        }
    ];

    /**
     * 
     * @param {Array} NodeStructure 
     * @param {Array} AdjacencyList
     * @returns A Structure Object containing validated inputs
     * @description Should be encased with try-catch wherever initialied, so that Validation could throw error
     */
    constructor(NodeStructure = null, AdjacencyList = null){
        this.NodeStructure = NodeStructure ?? this.initialNodeStructure;
        this.AdjacencyList = AdjacencyList ?? this.initialAdjacencyList;
        
        this.ValidateInputs(this.NodeStructure, this.AdjacencyList);

        console.log(`Fetched Node State Array[]: ${this.NodeStructure}`);
        console.log(`Fetched Adjacency List Array[]: ${this.AdjacencyList}`);
    }

    /**
     * @todo Throw Exceptions for the following:
     * 0) Check if any of them are empty or having missing keys (ex: type is not given)
     * 1) If Adjacency List contains the name of a Node which doesn't occur in NodeStructure and is also not const OUTPUT
     * 2) If Adjacency List mentions invalid property keys or values, (Negative Integers/Bad Strings etc)
     * 3) Basically make sure eveything is okay in a nutshell, since this is the only time when outside user input will be scanned
     * @param {Array} NodeStructure 
     * @param {Array} AdjacencyList 
     */
    ValidateInputs(NodeStructure, AdjacencyList){
        
    }
}


// const createStructure = () => {
//     /*
//         Creating an oscillator means creating a gain with it.

//         For now, we can go ahead with FX! and FX2, but ideally, no chain seperation should be present


//         OSCILLATOR (OSC1) -> GAIN (OSC1GAIN) -> GAIN (LFOGAIN) -> OUTPUT   
//         OSC2


//     */
// }

// var context = new AudioContext();

// function osc(type, frequency , detune){
//     this.type = type;
//     this.frequency = frequency;
//     this.detune = detune;
    
//     this.oscillator = context.createOscillator();
//     this.gain = context.createGain();
//     this.oscillator.frequency.value = frequency;
//     this.oscillator.type = type;
//     this.oscillator.detune.value = detune;
    
//     this.play = function(destination , volume){
//     this.destination = destination;
//     this.volume = volume;
//     this.oscillator.connect(this.gain);
//     this.gain.gain.value = volume;
//     this.gain.connect(destination);
//     this.oscillator.start(0);
//     };
    
//     this.stop = function(){
//     this.oscillator.stop(0);
//     }
    
    
    
// }
// /*
// osc.prototype.play = function(){
//     oscillator.connect(context.destination);
//     oscillator.noteOn(0);
// };
// */
// osctest = new osc("sine",400,0);
// osctest.play(context.destination , 0.9);


// osctest2 = new osc("sawtooth", 6 , 0);
// osctest2.play(osctest.oscillator.frequency , 1000);

// //osctest.stop();
// //osctest2.stop();
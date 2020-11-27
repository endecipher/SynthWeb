import { ThrowUnidentifiedFXChainKeyException } from '../../../static/Errors';
import {
    FX1, FX2, 
    OSCILLATOR,
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
    OSC1GAIN,
    OSC2GAIN,
    OUTPUT,
    OSC1,
    OSC2
} from '../Types';

export default class Structure{

    NodeStructure = [
        this.getNodeData(OSC1, FX1, OSCILLATOR, "OscillatorOne", 
            { 
                type : OSC_TYPE_TRIANGLE, 
                frequency : 130.8
            }),
        this.getNodeData(LFO_OSCILLATOR, FX1, OSCILLATOR, "LfoOscillatorOne", 
            { 
                type : OSC_TYPE_SQUARE, 
                frequency : 40
            }),
        this.getNodeData(OSC1GAIN, FX1, GAIN, "OscillatorOneGain", 
            {       
                gain: 5 
            }),
        this.getNodeData(OSC2, FX2, OSCILLATOR, "OscillatorTwo", 
            { 
                type : OSC_TYPE_SINE, 
                frequency : 130.8
            }),
        this.getNodeData(OSC2GAIN, FX2, GAIN, "OscillatorTwoGain", 
            {       
                gain: 3 
            }),
    ]

    AdjacencyList = [
        {
            OSC1 : [ 
                {
                    name : OSC1GAIN,
                    property : null //Is Property is null, it's connecting to the node
                } 
            ]
        },
        {
            LFO_OSC1 : [
                {
                    name : OSC1GAIN,
                    property : "gain" 
                } 
            ]
        },
        {
            OSC2 : [ 
                {
                    name : OSC2GAIN,
                    property : null
                } 
            ]
        },
        {
            OSC1GAIN : [
                {
                    name : OUTPUT,
                    property : null
                }
            ]
        },
        {
            OSC2GAIN : [
                {
                    name : OUTPUT,
                    property : null
                }
            ]
        }
    ];

    constructor(){
        console.log(`Building Map`);
    }

    getNodeData(name, chain, type, description, initialValues = {}){
    
        if (chain === FX1 || chain === FX2){         
            return {
                name,
                chain,
                type,
                description,
                initialValues
            };
        }
    
        ThrowUnidentifiedFXChainKeyException();
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
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
} from '../../components/storage/Types';

export const InitialNodeStructure = [
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
];

export const InitialAdjacencyList = [
    {
        from  : {
            name : "OSC1",
            property : null
        },
        to : [ 
            {
                name : "OSC1Gain",
                property : null //Is Property is null, it's connecting to the node
            }
        ]
    },
    {
        from : {
            name : "OSC2",
            property : null
        },
        to : [ 
            {
                name : "OSC2Gain",
                property : null 
            }
        ]
    },
    {
        from : {
            name : "OSC1Gain",
            property : null
        },
        to : [
            {
                name : OUTPUT,
                property : null 
            }
        ]
    },
    {
        from : {
            name : "OSC2Gain",
            property : null
        },
        to : [
            {
                name : OUTPUT,
                property : null 
            }
        ]
    }
];
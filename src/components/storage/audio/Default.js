import { ThrowUnidentifiedNodeTypeAccessException } from "../../../static/Errors"
import { OSCILLATOR, OSC_TYPE_SAWTOOTH, OSC_TYPE_SINE, PLAYABLE_OSCILLATOR } from "../Types"

export const defaultOscillatorValues = () => {
    return {
        type: OSC_TYPE_SINE,
        frequency: 130.8,
        detune: 0
    }
}

export const defaultPlayableOscillatorValues = () => {
    return {
        type: OSC_TYPE_SINE,
        frequency: 130.8,
        detune: 0,
        volume: 0,
    }
}

export const defaultGainValues = () => {
    return {
        gain: 10,
        linearRampToValueAtTime: 10
    }
}

/**
 * Fetches Default Properties for types. Handy for node Addition.
 * @param {String} type 
 */
export const getDefaultPropertiesForType = (type) => {
    switch(type){
        case OSCILLATOR:
            return defaultOscillatorValues();
        case PLAYABLE_OSCILLATOR:
            return defaultPlayableOscillatorValues();
        case GAIN:
            return defaultGainValues();
        default:
            ThrowUnidentifiedNodeTypeAccessException(`Cannot get Default Properties for type ${type}`);
    }
}
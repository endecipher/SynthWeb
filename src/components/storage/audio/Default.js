import { ThrowUnidentifiedNodeTypeAccessException } from "../../../static/Errors"
import { 
    OSCILLATOR, 
    OSC_TYPE_SINE, 
    OSC_TYPE_TRIANGLE,
    PLAYABLE_OSCILLATOR, 
    GAIN,
    FREQUENCY,
    TYPE,
    DETUNE,
    GAINVAL,
    LINEAR_RAMP,
    DELAY
} from "../Types"

export const defaultOscillatorValues = () => {
    return {
        [TYPE] : OSC_TYPE_SINE,
        [FREQUENCY]: 130.8,
        [DETUNE]: 0
    }
}

export const defaultPlayableOscillatorValues = () => {
    return {
        [TYPE] : OSC_TYPE_TRIANGLE,
        [FREQUENCY]: 130.8,
        [DETUNE]: 0
    }
}

export const defaultGainValues = () => {
    return {
        [GAINVAL] : 0.5,
        [LINEAR_RAMP]: 0.1
    }
}

export const defaultDelayValues = () => {
    return {
        [DELAY] : 0.5
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
        case DELAY:
            return defaultDelayValues();
        default:
            ThrowUnidentifiedNodeTypeAccessException(`Cannot get Default Properties for type ${type}`);
    }
}
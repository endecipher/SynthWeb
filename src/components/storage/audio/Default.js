import { OSC_TYPE_SAWTOOTH, OSC_TYPE_SINE } from "../Types"

export const defaultOscillatorValues = () => {
    return {
        type: OSC_TYPE_SINE,
        frequency: 130.8,
        detune: 0
    }
}

export const defaultGainValues = () => {
    return {
        gain: 10,
        linearRampToValueAtTime: 10
    }
}
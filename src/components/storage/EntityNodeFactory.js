import EntityNode from './EntityNode';
import {
    BIQUADFILTER, CONVOLVER, GAIN, DELAY, DYNAMICSCOMPRESSOR, OSCILLATOR, WAVESHAPER, 
    PLAYABLE_OSCILLATOR, FREQUENCY, DETUNE, TYPE, GAINVAL, LINEAR_RAMP
} from './Types';
import Oscillator from './audio/Oscillator';
import PlayableOscillator from './audio/PlayableOscillator';
import {
    ThrowInvalidAudioNodeException
} from './../../static/Errors'
import BaseContext from './BaseContext';
import Gain from './audio/Gain';
import Delay from './audio/Delay';

export default class EntityNodeFactory{
    /**
     * @name createNode
     * @param {BaseContext} Context 
     * @param {number} index 
     * @returns {(payload : Object) => EntityNode}
     * @example Usage: .createNode(Context)({ ...payload})
     */
    static createNode(Context, index){
        return (payload) => {

            const { name, type, properties, description } = payload;

            switch(type){
                case OSCILLATOR:
                    return new EntityNode({
                        name,
                        description,
                        type,
                        entity : new Oscillator(Context.getAudioContext(), properties)
                    }, index);
                case PLAYABLE_OSCILLATOR:
                    return new EntityNode({
                        name,
                        description,
                        type,
                        entity : new PlayableOscillator(Context.getAudioContext(), properties)
                    }, index);
                case GAIN:
                    return new EntityNode({
                        name,
                        description,
                        type,
                        entity : new Gain(Context.getAudioContext(), properties)
                    }, index);
                case DELAY:
                    return new EntityNode({
                        name,
                        description,
                        type,
                        entity : new Delay(Context.getAudioContext(), properties)
                    }, index);
                default: 
                    ThrowInvalidAudioNodeException();
            }
        }
    }

    
    /**
     * Fetch all types of audioNodes to choose from
     * @returns {Array} An Array of strings
     */
    static getAllTypesOfAudioNodesToAdd(){
        return [
            PLAYABLE_OSCILLATOR,
            OSCILLATOR,
            GAIN,
            DELAY
        ];
    }

    static getValidPropertiesForAudioNodeType(type){
        switch(type){
            case PLAYABLE_OSCILLATOR:
            case OSCILLATOR:
                return [
                    FREQUENCY,
                    DETUNE,
                    TYPE
                ];
            case GAIN:
                return [
                    GAINVAL,
                    LINEAR_RAMP
                ];
            case DELAY:
                return [
                    DELAY
                ];
            default:
                return [

                ]
        }
    }

    static getAvailableConnectsForAudioNodeType(type){
        switch(type){
            case PLAYABLE_OSCILLATOR:
            case OSCILLATOR:
                return [
                    FREQUENCY
                ];
            case GAIN:
                return [
                    GAINVAL
                ];
            case DELAY:
                return [
                    DELAY
                ];
            default: 
                return [
                    
                ]
        }
    }
}
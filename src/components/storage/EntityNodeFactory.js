import EntityNode from './EntityNode';
import {
    BIQUADFILTER, CONVOLVER, GAIN, DELAY, DYNAMICSCOMPRESSOR, OSCILLATOR, WAVESHAPER
} from './Types';
import Oscillator from './audio/Oscillator';
import {
    ThrowInvalidAudioNodeException
} from './../../static/Errors'
import BaseContext from './BaseContext';
import Gain from './audio/Gain';

export default class EntityNodeFactory{
    /**
     * @name createNode
     * @param {BaseContext} Context 
     * @returns {(payload : Object) => EntityNode}
     * @example Usage: .createNode(Context)({ ...payload})
     */
    static createNode(Context){
        return (payload) => {

            const { name, type, properties, description } = payload;

            switch(type){
                case OSCILLATOR:
                    return new EntityNode({
                        name,
                        description,
                        type,
                        entity : new Oscillator(Context.getAudioContext(), properties)
                    });
                case GAIN:
                    return new EntityNode({
                        name,
                        description,
                        type,
                        entity : new Gain(Context.getAudioContext(), properties)
                    });
                default: 
                    ThrowInvalidAudioNodeException();
            }
        }
    }
}
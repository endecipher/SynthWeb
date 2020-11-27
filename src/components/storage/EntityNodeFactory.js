import EntityNode from './EntityNode';
import {
    BIQUADFILTER, CONVOLVER, GAIN, DELAY, DYNAMICSCOMPRESSOR, OSCILLATOR, WAVESHAPER
} from './Types';
import Oscillator from './audio/Oscillator';
import {
    ThrowInvalidAudioNodeException
} from './../../static/Errors'

export default class EntityNodeFactory{

    constructor(){

    }

    createNode(Context){
        return (Type) => {
            switch(Type){
                case OSCILLATOR:
                    return new EntityNode({
                        Type : OSCILLATOR,
                        AudioNode : new Oscillator(Context.getAudioContext()),
                        Description : "A New Oscillator"
                    });
                default: 
                    ThrowInvalidAudioNodeException();
            }
        }
    }
}
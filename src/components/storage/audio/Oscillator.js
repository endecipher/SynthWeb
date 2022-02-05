import {
    OSC_TYPE_SAWTOOTH,
    OSC_TYPE_SINE,
    OSC_TYPE_SQUARE,
    OSC_TYPE_TRIANGLE,
    FREQUENCY,
    DETUNE,
    TYPE
} from './../Types';
import AudioWrapper from './AudioWrapper';
import {
    defaultOscillatorValues
} from './Default';
import { ThrowInvalidPropertyAccessException } from '../../../static/Errors';

export default class Oscillator extends AudioWrapper{

    /**
     * Creates a wrapper class of the Oscillator Node
     * @param {AudioContext} ctx 
     * @param {Object} properties 
     */
    constructor(ctx, properties){
        super(ctx, ctx.createOscillator(), [TYPE, FREQUENCY, DETUNE], [FREQUENCY]);

        const {
            [TYPE] : type,
            [FREQUENCY] : frequency,
            [DETUNE] : detune
        } = properties;
        
        /**
         * @type {OscilatorNode} Oscillator
         */
        let Oscillator = this.audioNode;

        const defaults = defaultOscillatorValues();

        this.internal = {
            type : type ?? defaults.type,
            frequency : frequency ?? defaults.frequency,
            detune : detune ?? defaults.detune,
        };

        Oscillator.type = this.internal.type;
        Oscillator.frequency.setValueAtTime(this.internal.frequency, this.ctx.currentTime); // value in hertz
        Oscillator.detune.setValueAtTime(this.internal.detune, this.ctx.currentTime);
        Oscillator.start(this.ctx.currentTime);
    }

    
    /**
     * @private Private method to change internal frequency
     * @param {number} freq 
     */
    changeFrequency(freq){
        this.audioNode.frequency.setValueAtTime(freq, this.ctx.currentTime);
        this.internal[FREQUENCY] = freq;
    }

    /**
     * Detunes the Oscillator
     * @param {number} cents 
     */
    detune(cents){
        this.internal[DETUNE] = cents;
        this.audioNode.detune.setValueAtTime(cents, this.ctx.currentTime);
    }

    /**
     * One of the valid oscillator Types
     * @param {string} newType 
     */
    changeType(newType){
        this.internal[TYPE] = newType;
        this.audioNode.type = newType;
    }

    /**
     * Implementation of AudioWrapper
     * @param {Object} activeStateDetails 
     */
    changeStateDetails(activeStateDetails){
        super.changeStateDetails();

        const {
            [TYPE] : type,
            [FREQUENCY] : frequency,
            [DETUNE] : detune
        } = activeStateDetails.properties;

        this.internal = {
            type : type,
            frequency : frequency,
            detune : detune,
        }

        this.changeType(type);
        this.detune(detune);
        this.changeFrequency(frequency)
    }

    /**
     * Implementation of AudioWrapper
     */
    fetchStateDetails(){
        super.fetchStateDetails();
        return this.internal;
    }

    static isValidType(str){
        switch(str){
            case OSC_TYPE_SINE:
            case OSC_TYPE_SQUARE:
            case OSC_TYPE_TRIANGLE:
            case OSC_TYPE_SAWTOOTH:
                return true;
            default:
                return false;
        }
    }

    static isValidFrequency(frequency){
        return AudioWrapper.isValidNumber(frequency);
    }

    static isValidDetune(detune){
        return AudioWrapper.isValidNumber(detune);
    }

    /**
     * Fetches property details like min, max etc
     * @param {String} propertyName 
     */
     static fetchPropertyDetails(propertyName){
        switch(propertyName){
            case FREQUENCY:
                return {
                    min: 0,
                    max: 1200,
                    value: 60,
                    name: propertyName
                };
            case DETUNE:
                return {
                    min : 0,
                    max : 100,
                    value : 0,
                    name : propertyName
                };
            case TYPE:
                return {
                    values : [
                        OSC_TYPE_TRIANGLE,
                        OSC_TYPE_SINE,
                        OSC_TYPE_SQUARE,
                        OSC_TYPE_SAWTOOTH
                    ]
                };
            default:
                ThrowInvalidPropertyAccessException(propertyName);
        }
    }
}
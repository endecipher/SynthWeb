import { ThrowInvalidPropertyAccessException } from '../../../static/Errors';
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
    defaultPlayableOscillatorValues
} from './Default'

export default class PlayableOscillator extends AudioWrapper{

    /**
     * Creates a wrapper class of the Oscillator Node
     * @param {AudioContext} ctx 
     * @param {Object} properties 
     */
    constructor(ctx, properties){
        super(ctx, ctx.createOscillator(), [TYPE, FREQUENCY, DETUNE], [FREQUENCY], ctx.createGain());

        const {
            [TYPE] : type,
            [FREQUENCY] : frequency,
            [DETUNE] : detune
        } = properties;

        let Oscillator = this.audioNode;
        let Gain = this.audioNodeProxy;

        const {
            defaultType,
            defaultFrequency,
            defaultDetune,
        } = defaultPlayableOscillatorValues();

        this.internal = {
            [TYPE] : type ?? defaultType,
            [FREQUENCY] : frequency ?? defaultFrequency,
            [DETUNE] : detune ?? defaultDetune,
        };

        Oscillator.type = this.internal.type;
        Oscillator.frequency.setValueAtTime(this.internal.frequency, this.ctx.currentTime); // value in hertz
        Oscillator.detune.setValueAtTime(this.internal.detune, this.ctx.currentTime);
        Gain.gain.setValueAtTime(0, this.ctx.currentTime);
        
        //Make Oscillator Start with Default Value Gain (0)
        Oscillator.connect(Gain);
        Oscillator.start(this.ctx.currentTime)
    }

    /**
     * Plays the oscillator's frequency provided
     * @param {number} freq 
     */
    play = (freq) => {
        console.log(`Starting Oscillator at ${freq}`);
        this.audioNode.frequency.setValueAtTime(freq, this.ctx.currentTime);
        this.audioNodeProxy.gain.setValueAtTime(2, this.ctx.currentTime);
    }

    /**
     * Stops the Oscillator
     */
    stop = () => {
        console.log(`Stopping Oscillator`);
        this.audioNodeProxy.gain.setValueAtTime(0, this.ctx.currentTime);
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
            [TYPE] : type,
            [FREQUENCY] : frequency,
            [DETUNE] : detune
        }
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
            case DETUNE:
                return {
                    min : 0,
                    max : 100,
                    value : 0,
                    name : propertyName
                };
            default:
                ThrowInvalidPropertyAccessException(propertyName);
        }
    }
}
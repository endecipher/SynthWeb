import {
    OSC_TYPE_SAWTOOTH,
    OSC_TYPE_SINE,
    OSC_TYPE_SQUARE,
    OSC_TYPE_TRIANGLE
} from './../Types';
import AudioWrapper from './AudioWrapper';
import {
    defaultOscillatorValues
} from './Default'

export default class Oscillator extends AudioWrapper{

    /**
     * Creates a wrapper class of the Oscillator Node
     * @param {AudioContext} ctx 
     * @param {Object} properties 
     */
    constructor(ctx, properties){
        super(ctx, ctx.createOscillator(), ["type", "frequency", "detune"], ["frequency"]);

        const {
            type,
            frequency,
            detune
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

        this.state = {
            hasStarted : false,
        }
    }

    /**
     * 
     * @param {number} freq 
     * @param {number} detune 
     */
    start(freq, detune){
        console.log(`Starting Oscillator at ${this.audioNode.frequency}`);
        
        if(!(freq === this.state.currentFrequency)){
            if(this.state.hasStarted){
                this.changeFrequency(freq);
            }else{
                this.changeFrequency(freq);
                this.audioNode.start(this.ctx.currentTime);
                this.state.hasStarted = true;
            }
        }
    }

    /**
     * Stops the Oscillator
     */
    stop(){
        console.log(`Stopping Oscillator`);
        //this.audioNode.stop(this.ctx.currentTime);
        this.changeFrequency(150);
    }

    /**
     * @private Private method to change internal state
     * @param {number} freq 
     */
    changeFrequency(freq){
        this.audioNode.frequency.setValueAtTime(freq, this.ctx.currentTime);
        this.state.currentFrequency = freq;
    }

    /**
     * Detunes the Oscillator
     * @param {number} cents 
     */
    detune(cents){
        this.audioNode.detune.setValueAtTime(cents, this.ctx.currentTime);
    }

    /**
     * One of the valid oscillator Types
     * @param {string} newType 
     */
    changeType(newType){
        this.audioNode.type = newType;
    }

    /**
     * Implementation of AudioWrapper
     * @param {Object} activeStateDetails 
     */
    changeStateDetails(activeStateDetails){
        super.changeStateDetails();

        const {
            type,
            frequency,
            detune
        } = activeStateDetails.properties;

        this.internal = {
            type : type,
            frequency : frequency,
            detune : detune,
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
}
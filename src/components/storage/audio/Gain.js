import AudioWrapper from "./AudioWrapper";
import {
    defaultGainValues
} from './Default';

export default class Gain extends AudioWrapper{
    /**
     * Creates a wrapper class of the Oscillator Node
     * @param {AudioContext} ctx 
     * @param {Object} properties 
     */
    constructor(ctx, properties){
        super(ctx, ctx.createGain(), ["gain", "linearRampToValueAtTime"], ["gain", "linearRampToValueAtTime"]);

        const {
            gain,
            linearRampToValueAtTime,
        } = properties;
        
        /**
         * @type {OscilatorNode} Oscillator
         */

        const defaults = defaultGainValues();

        this.internal = {
            gain : gain ?? defaults.gain,
            linearRampToValueAtTime : linearRampToValueAtTime ?? defaults.linearRampToValueAtTime,
        };

        let Gain = this.audioNode;
        Gain.gain.linearRampToValueAtTime(this.internal.linearRampToValueAtTime, this.ctx.currentTime);
        Gain.gain.setValueAtTime(this.internal.gain, this.ctx.currentTime);
    }

    /**
     * Implementation of AudioWrapper
     * @param {Object} activeStateDetails 
     */
    changeStateDetails(activeStateDetails){
        super.changeStateDetails();

        const {
            gain,
            linearRampToValueAtTime,
        } = activeStateDetails.properties;

        this.internal = {
            gain : gain,
            linearRampToValueAtTime : linearRampToValueAtTime,
        };
    }

    /**
     * Implementation of AudioWrapper
     */
    fetchStateDetails(){
        super.fetchStateDetails();

        return this.internal;
    }
}
import { GAINVAL, LINEAR_RAMP } from "../Types";
import AudioWrapper from "./AudioWrapper";
import {
    defaultGainValues
} from './Default';
import {
    ThrowInvalidPropertyAccessException
} from '../../../static/Errors';

export default class Gain extends AudioWrapper{
    /**
     * Creates a wrapper class of the Oscillator Node
     * @param {AudioContext} ctx
     * @param {Object} properties 
     */
    constructor(ctx, properties){
        super(ctx, ctx.createGain(), [GAINVAL, LINEAR_RAMP], [GAINVAL, LINEAR_RAMP]);

        const {
            gain,
            linearRampToValueAtTime,
        } = properties;
        
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

        let Gain = this.audioNode;
        Gain.gain.linearRampToValueAtTime(this.internal.linearRampToValueAtTime, this.ctx.currentTime);
        Gain.gain.setValueAtTime(this.internal.gain, this.ctx.currentTime);
    }

    /**
     * Implementation of AudioWrapper
     */
    fetchStateDetails(){
        super.fetchStateDetails();

        return this.internal;
    }

    /**
     * Fetches property details like min, max etc
     * @param {String} propertyName 
     */
     static fetchPropertyDetails(propertyName){
        switch(propertyName){
            case GAINVAL:
                return {
                    min : 0,
                    max : 1,
                    value : 0.5,
                    name : propertyName
                };
            case LINEAR_RAMP:
                return {
                    min : 0,
                    max : 1,
                    value : 0.1,
                    name : propertyName
                };
            default:
                ThrowInvalidPropertyAccessException(propertyName);
        }
    }
}
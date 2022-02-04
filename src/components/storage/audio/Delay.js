import { DELAY } from "../Types";
import AudioWrapper from "./AudioWrapper";
import {
    defaultDelayValues
} from './Default';
import {
    ThrowInvalidPropertyAccessException
} from '../../../static/Errors'

export default class Delay extends AudioWrapper{
    /**
     * Creates a wrapper class of the Oscillator Node
     * @param {AudioContext} ctx 
     * @param {Object} properties 
     */
    constructor(ctx, properties){
        super(ctx, ctx.createDelay(), [DELAY], [DELAY]);

        const {
            [DELAY] : delay
        } = properties;
        
        const defaults = defaultDelayValues();

        this.internal = {
            delay : delay ?? defaults.delay,
        };

        this.audioNode.delayTime.setValueAtTime(this.internal.delay, this.ctx.currentTime);
    }

    /**
     * Implementation of AudioWrapper
     * @param {Object} activeStateDetails 
     */
    changeStateDetails(activeStateDetails){
        super.changeStateDetails();

        const {
            delay
        } = activeStateDetails.properties;

        this.internal = {
            delay : delay,
        };

        this.audioNode.delayTime.setValueAtTime(delay, this.ctx.currentTime);
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
            case DELAY:
                return {
                    min : 0,
                    max : 10,
                    value : 5,
                    name : propertyName
                };
            default:
                ThrowInvalidPropertyAccessException(propertyName);
        }
    }
}
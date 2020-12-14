import { v4 as uuidv4 } from 'uuid';
import AudioWrapper from './audio/AudioWrapper';
import {
    ThrowPerformOnAudioWrapperException,
    ThrowInvalidPropertyToConnectException,
    ThrowConnectionFailedException
} from './../../static/Errors';
import { PLAYABLE } from './Types';

export default class EntityNode {

    /**
     * Accepts the name, type, description and an extended AudioWrapper as an object
     * @param {Object} entityDetails 
     */
    constructor(entityDetails){
        const {
            name,
            type,
            description,
            entity
        } = entityDetails;

        this.Id = uuidv4();
        this.name = name;
        this.type = type;

        /**
         * @type {AudioWrapper} Refers to an Audio Class (Oscillator/Gain etc)
         */
        this.entity = entity;
        this.description = description;
        this.playable = type.toString().includes(PLAYABLE);
    }

    /**
     * Returns the UUID of the EntityNode
     * @returns {string} UUID
     */
    getId(){
        return this.Id;
    }

    /**
     * Returns the type of the Entity Audio Node
     * @returns {string} Type
     */
    getType(){
        return this.type;
    }

    /**
     * Checks if the belonging AudioNode has play(input) and stop() defined.
     * @returns {Array} [ playFunction, stopFunction ]
     */
    getPlayableInfo(){
        if(this.playable){
            return [ this.entity.play, this.entity.stop ];
        }else{
            return null;
        }
    }

    /**
     * Perform a function on the classes extended by Audio Wrapper. 
     * @todo Search JSDoc to check how to make AudioWrapper appear base class.
     * @typedef { (node: AudioWrapper) => void } CallFunction 
     * @param {CallFunction} f - A function which accepts a single node parameter
     */
    performFunction(f){
        try{
            f(this.entity);
        }catch(err){
            ThrowPerformOnAudioWrapperException(err);
        }
    }

    /**
     * @returns {Function} To Connect to the Node
     */
    connectTo(){
        return (audioParamOrNode) => {
            try{
                this.entity.connect(audioParamOrNode);
            }catch(err){
                ThrowConnectionFailedException(`while trying to connect ${this.name} : ${err}`)
            }
        };
    }

    /**
     * @returns {(AudioParam | AudioNode)}
     */
    getNodeToConnect(property){
        if(property){
            if(this.entity.getAvailableConnects().includes(property)){
                return this.entity.audioNode.property;
            }else{
                ThrowInvalidPropertyToConnectException(`property ${property} of ${this.name} is not present`);
            }
        }else{
            return this.entity.audioNode;
        }
    }

    /**
     * Returns the activeStateDetails of the current EntityNode
     * @returns {Object} 
     */
    fetchDetails(){
        return {
            name : this.name,
            type : this.type,
            description : this.description,
            properties : this.entity.fetchStateDetails()
        }
    }
}
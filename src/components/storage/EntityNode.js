import { v4 as uuidv4 } from 'uuid';
import AudioWrapper from './audio/AudioWrapper';
import {
    ThrowPerformOnAudioWrapperException,
    ThrowInvalidPropertyToConnectException,
    ThrowConnectionFailedException
} from './../../static/Errors';

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
    }

    /**
     * Returns the UUID of the EntityNode
     * @returns {string} UUID
     */
    getId(){
        return this.Id;
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
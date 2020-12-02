export default class AudioWrapper{

    /**
     * AudioWrapper for all Types
     * @param {AudioNode} audioNode 
     * @param {Array} validAudioParams
     * @param {Array} availableConnects
     */
    constructor(ctx, audioNode, validAudioParams = [], availableConnects = []){
        this.ctx = ctx;
        this.audioNode = audioNode;
        this.validAudioParams = validAudioParams;
        this.availableConnects = availableConnects;
    }

    /**
     * Disconnects the Audio Node based on the inputs. If none, then completely disconnects.
     * @param {(AudioNode | AudioParam)} audioEntity 
     */
    disconnect(audioEntity = null){
        this.audioNode.disconnect(audioEntity)
    }

    /**
     * Connects the Audio Node based on the inputs. 
     * @param {(AudioNode | AudioParam)} audioEntity 
     */
    connect(audioEntity){
        this.audioNode.connect(audioEntity);
    }

    getValidAudioProperties(){
        return this.validAudioParams;
    }

    getAvailableConnects(){
        return this.availableConnects;
    }

    /**
     * Change State Details
     * @abstract
     * @param {Object} activeStateDetails 
     * @description Needs to be overriden by every inheritor of AudioWrapper
     */
    changeStateDetails(activeStateDetails){
        console.log(`changeState ${activeStateDetails}`);
    }

    /**
     * Fetch State Details
     * @abstract
     * @description Needs to be overriden by every inheritor of AudioWrapper
     */
    fetchStateDetails(){
        console.log(`fetchState ${activeStateDetails}`);
    }

    /**
     * Checks is it's a positive number
     * @param {number} num 
     */
    static isValidNumber(num){
        if(!num.isNaN() && num >= 0)
        {
            return true;
        }
        
        return false;
    }
}
export default class AudioWrapper{

    /**
     * AudioWrapper for all Types
     * @param {AudioNode} audioNode 
     * @param {Array} validAudioParams
     * @param {Array} availableConnects
     * @param {AudioNode} audioNodeProxy For Connections, the proxy will be used.
     */
    constructor(ctx, audioNode, validAudioParams = [], availableConnects = [], audioNodeProxy = null){
        this.ctx = ctx;
        this.audioNode = audioNode;
        this.validAudioParams = validAudioParams;
        this.availableConnects = availableConnects;
        this.audioNodeProxy = audioNodeProxy;
    }

    /**
     * Disconnects the Audio Node based on the inputs. If none, then completely disconnects.
     * @param {(AudioNode | AudioParam)} audioEntity 
     */
    disconnect(audioEntity = null){
        let node = this.audioNodeProxy ?? this.audioNode;
        node.disconnect(audioEntity)
    }

    /**
     * Connects the Audio Node based on the inputs. 
     * @param {(AudioNode | AudioParam)} audioEntity 
     */
    connect(audioEntity){
        let node = this.audioNodeProxy ?? this.audioNode;
        node.connect(audioEntity);
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
        console.log(`fetchState activeStateDetails`);
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
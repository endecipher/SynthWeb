import { v4 as uuidv4 } from 'uuid';

export default class EntityNode {

    Id = null;

    State = {
        Type : "Undefined Audio Node Type",
        AudioNode : null,
        Description : "An Audio Node Entity"
    };

    constructor(state){
        const { Type, AudioNode, Description } = state;

        this.State.Type = Type;
        this.State.AudioNode = AudioNode;
        this.State.Description = Description;
        this.Id = uuidv4();
    }

    getState(){
        return this.State;
    }

    getId(){
        return this.Id;
    }

    /**
     * Perform a function on the Audio Node.
     * @typedef { (node: AudioNode) => void } CallFunction 
     * @param {CallFunction} f - A function which accepts a single node parameter
     */
    performFunctionOnNode = (f) => {
        f(this.State.AudioNode);
    }

    getAudioNode(){
        return this.State.AudioNode;
    }
}
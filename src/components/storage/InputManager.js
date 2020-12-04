export default class InputManager {

    /**
     * Supply the arrays for Playable Audio Components to trigger on inputs
     * @param {Array} playFunctions 
     * @param {Array} stopFunctions 
     */
    constructor(playFunctions = [], stopFunctions = []) {
        this.PressedFrequency = 0;
        this.PlayableFunctions = playFunctions;
        this.StoppableFunctions = stopFunctions;
    }
  
    /**
     * Calls Playable events with the supplied frequency
     * @param {number} freq 
     */
    addFrequency(freq){
        if(freq !== this.PressedFrequency){
            this.PressedFrequency = freq;
            this.NotifyPlay(freq);
        }
    }

    /**
     * Calls Stoppable events with the supplied frequency
     * @param {number} freq 
     */
    removeFrequency(freq){
        if(this.PressedFrequency === freq){
            this.PressedFrequency = 0;
            this.NotifyStop();
        }
    }

    /**
     * Calls Stoppable events with the supplied frequency
     * @param {number} freq 
     */
    forceStop(){
        this.PressedFrequency = 0;
        this.NotifyStop();
    }

    /**
     * @description Iterates and calls over the playable functions
     * @param {number} freq
     */
    NotifyPlay = (freq) => {
        this.PlayableFunctions.forEach(func => {
            func(freq);
        });
    }

    /**
     * @description Iterates and calls over the stoppable functions
     */
    NotifyStop = () => {
        this.StoppableFunctions.forEach(func => {
            func();
        });
    }

    addPlayableFunction = (func) => {
        this.PlayableFunctions.unshift(func);
    }
    
    addStoppableFunction = (func) => {
        this.StoppableFunctions.unshift(func);
    }
}
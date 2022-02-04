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
        
        this.KeyDisplayFunction = null;
    }
  
    /**
     * Calls Playable events with the supplied frequency
     * @param {number} freq 
     */
    addFrequency(freq){
        if(freq !== this.PressedFrequency){
            this.PressedFrequency = freq;
            this.NotifyPlay(freq);
            this.KeyDisplayFunction(freq);
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
            this.KeyDisplayFunction(0);
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

    /**
     * Add the main Key Function to notify display events
     * Any number greater than zero means an active key is pressed
     * @param {(frequency : number) => void} func 
     */
    addKeyDisplayFunc = (func) => {
        this.KeyDisplayFunction = func;
    }
}
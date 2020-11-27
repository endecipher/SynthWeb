export default class BaseContext {

    #AudioContext = null;

    constructor() {
      if (BaseContext._instance) {
        return BaseContext._instance
      }
      this.#AudioContext = new AudioContext();
      BaseContext._instance = this;
      // ... your rest of the constructor code goes after this
    }

    getAudioContext(){
        return this.#AudioContext;
    }
  }
  
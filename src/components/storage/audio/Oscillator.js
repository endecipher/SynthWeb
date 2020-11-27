import {
    OSC_TYPE_SAWTOOTH,
    OSC_TYPE_SINE,
    OSC_TYPE_SQUARE,
    OSC_TYPE_TRIANGLE
} from './../Types';

export default class Oscillator{

    constructor(ctx){
        this.ctx = ctx; //Have local reference of Context
        this.initialFrequencyValue = 0;
        this.Oscillator = ctx.createOscillator();
        this.Oscillator.type = OSC_TYPE_TRIANGLE;
        this.Oscillator.frequency.setValueAtTime(this.initialFrequencyValue, ctx.currentTime); // value in hertz
        this.hasStarted = false;
        this.currentFrequency = this.initialFrequencyValue;
    }

    disconnect(object = null){
        this.Oscillator.disconnect(object);
    }

    start(freq){
        console.log(`Starting Oscillator at ${this.Oscillator.frequency}`);
        
        if(!(freq === this.currentFrequency)){
            if(this.hasStarted){
                this.changeFrequency(freq);
            }else{
                this.changeFrequency(freq);
                this.Oscillator.start(this.ctx.currentTime);
                this.hasStarted = true;
            }
        }
    }

    stop(){
        console.log(`Stopping Oscillator`);
        //this.Oscillator.stop(this.ctx.currentTime);
        this.changeFrequency(150);
    }

    changeFrequency(freq){
        this.Oscillator.frequency.setValueAtTime(freq, this.ctx.currentTime);
        this.currentFrequency = freq;
    }

    detune(cents){
        this.Oscillator.detune.setValueAtTime(cents, this.ctx.currentTime);
    }

    connect(next){
        this.Oscillator.connect(next);
    }
}
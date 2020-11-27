export default class Oscillator{
  constructor(audioCtx,osmanalyser,jsonobj){
    console.log("Oscillator constructor> type:"+jsonobj.osctype+" freq:"+jsonobj.oscfrequency+" ", audioCtx);
    this.oscillator = audioCtx.createOscillator();
    this.osmanalyser=osmanalyser;
    this.details=jsonobj;
    this.oscillator.type=jsonobj.osctype;
    this.oscillator.frequency.setValueAtTime(jsonobj.oscfrequency, audioCtx.currentTime); // value in hertz
    console.log("Oscillator constructor> type:"+this.details.osctype+" freq:"+this.details.oscfrequency);
  }
  
  play(){
    this.oscillator.connect(this.osmanalyser);
    this.oscillator.start();
    console.log("Playing type:"+this.details.osctype+" freq:"+this.details.oscfrequency);
  }

  stop(){
    this.oscillator.stop();
    //this.oscillator.disconnect(audioCtx.destination);
    console.log("StoppedXX type:"+this.details.osctype+" freq:"+this.details.oscfrequency);
  }

  detune(cents){
    this.oscillator.detune.setValueAtTime(cents, this.osmanalyser);
  }

  details(){
    console.log("Accessed Details: Type: "+this.details.osctype+" Freq: "+this.details.oscfrequency);
    return this.details; 
  }
}

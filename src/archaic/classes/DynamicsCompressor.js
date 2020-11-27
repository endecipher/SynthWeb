
//Class Dynamics Compressor
export default class DynamicsCompressor{

  constructor(audioCtx){
    this.audioCtx=audioCtx
    this.compressor = audioCtx.createDynamicsCompressor();
    this.compressor.threshold.setValueAtTime(-50, audioCtx.currentTime); //default -24: threshhold -100 and 0
    this.compressor.knee.setValueAtTime(40, audioCtx.currentTime); // default 30: knee 0 and 40
    this.compressor.ratio.setValueAtTime(12, audioCtx.currentTime); // def:12 ratio 1 and 20
    this.compressor.attack.setValueAtTime(0, audioCtx.currentTime); //def: 0.003, btw 0 and 1 attack
    this.compressor.release.setValueAtTime(0.25, audioCtx.currentTime); //def 0.25, btw 0 and 1 release
    return this;
  }

  getNode=function(){
    return this.compressor
  }

  updateParameters=function(jsonobj){
    //jsonobj={"updatetype":"","val":""}
    var utype=jsonobj.updatetype;
    var uvalue=jsonobj.val;
    if(utype=="threshold"){
      if (uvalue<=this.getDetails().threshold.max && uvalue>=this.getDetails().threshold.min){
        this.compressor.threshold.setValueAtTime(uvalue,this.audioCtx.currentTime);
        console.log("ClassDynComp: Updated",jsonobj)
        return true;
      }else{
        return false;
      }
    } else if(utype=="knee"){
      if(uvalue<=this.getDetails().knee.max && uvalue>=this.getDetails().knee.min){
        this.compressor.knee.setValueAtTime(uvalue, this.audioCtx.currentTime);
        console.log("ClassDynComp: Updated",jsonobj)
        return true;
      }else{
        return false;
      }
      // current filtering freq: default is 350 with range from 10 to 0.5*sample rate
    } else if(utype=="ratio"){
      if(uvalue<=this.getDetails().ratio.max && uvalue>=this.getDetails().ratio.min){
        this.compressor.ratio.setValueAtTime(uvalue, this.audioCtx.currentTime);
        console.log("ClassDynComp: Updated",jsonobj)
        return true;
      }else{
        return false;
      }
      //dB default is zero, set from -40 to +40; -ve gain is attenuation
    } else if(utype=="attack"){
      if(uvalue<=this.getDetails().attack.max && uvalue>=this.getDetails().attack.min){
        this.compressor.attack.setValueAtTime(uvalue,this.audioCtx.currentTime); //between 0.0001 to 1000
        console.log("ClassDynComp: Updated",jsonobj)
        return true;
      }else{
        return false;
      }
    } else if(utype=="release"){
      if(uvalue<=this.getDetails().release.max && uvalue>=this.getDetails().release.min){
        this.compressor.release.setValueAtTime(uvalue,this.audioCtx.currentTime);   
        console.log("ClassDynComp: Updated",jsonobj)
        return true;
      }else{
        return false;
      }
    }
  }

  getHelpText=function(){
    return "The DynamicsCompressorNode interface provides a compression effect, which lowers the volume of the loudest parts of the signal in order to help prevent clipping and distortion that can occur when multiple sounds are played and multiplexed together at once.";
  }

  getReduction=function(){
    return this.compressor.reduction; //read only property, range between -20 and 0
  }

  getDetails=function(){
    return {"threshold":{"min":"-100","max":"0","default":"-24"},
            "knee":{"min":"0","max":"40","default":"30"},
            "ratio":{"min":"1","max":"20","default":"12"},
            "attack":{"min":"0","max":"1","default":"0.003"},
            "release":{"min":"0","max":"1","default":"0.25"}
          };
  }
}//Class DynamicsCompressor ends

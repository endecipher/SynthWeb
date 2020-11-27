export default class Gain{

  constructor(audioCtx){
    this.audioCtx=audioCtx
    this.gainNode = this.audioCtx.createGain();
    return this;
  }

  getNode=function(){
    return this.gainNode
  }

  updateParameters=function(jsonobj){
    //console.log("ClassGain:",jsonobj)
    if(jsonobj.updatetype==="gain"){
      if(jsonobj.val>=this.getDetails().gain.min && jsonobj.val<=this.getDetails().gain.max){
        this.gainNode.gain.setValueAtTime(jsonobj.val, this.audioCtx.currentTime);  
        console.log("ClassGain: Updated",jsonobj)
        return true;
      }else{
        return false;
      }
    }
  }

  getDetails=function(){
    return {"gain":{"min":"0","max":"1","default":"0.5"}};
  }
}//Class Gain ends

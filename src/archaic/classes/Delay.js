//Class delay begins
export default class Delay{

  constructor(audioCtx){
      this.audioCtx=audioCtx
      this.synthDelay=audioCtx.createDelay(5.0);
      return this;
      //delayTime in seconds and its min val is zero, and max is maxDelayTime argument while creating, here it's 5.0
  }

  getNode=function(){
    return this.synthDelay
  }

  updateParameters=function(jsonobj){
    if(jsonobj.updatetype=="delaytime"){
      if(jsonobj.val>=this.getDetails().delaytime.min && jsonobj.val<=this.getDetails().delaytime.max){
        this.synthDelay.delayTime.setValueAtTime(jsonobj.val, this.audioCtx.currentTime);  
        console.log("ClassDelay: Updated",jsonobj)
        return true;
      }else{
        return false;
      }
    }
  }

  getDetails=function(){
    return {"delaytime":{"min":"0","max":"10.0","default":"5.0"}};
  }
}// Class Delay ends
//Class Stereo Panner
export default class StereoPanner{

  constructor(audioCtx){
    this.audioCtx=audioCtx
    this.panNode = audioCtx.createStereoPanner();
    return this;
  }

  getNode=function(){
    return this.panNode
  }

  updateParameters=function(jsonobj){
    if(jsonobj.updatetype=="pan"){
      if(jsonobj.val>=this.getDetails().pan.min && jsonobj.val<=this.getDetails().pan.max){
        this.panNode.pan.setValueAtTime(jsonobj.val, this.audioCtx.currentTime);// range between -1(full Left) to 1 (full right)
        console.log("ClassStereoPan: Updated",jsonobj)
        return true;
      }else{
        return false;
      }
    }
  }

  getDetails=function(){
    return {"pan":{"min":"-1","max":"1","default":"0"}};
  }
}//Class StereoPanner ends

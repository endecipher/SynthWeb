import React from "react"

class DynamicsCompressorComponent extends React.Component{
  constructor(props){
    super(props)
    console.log("I: DynamicsCompressor")
    this.state={
      "threshold":-50,
      "knee":40,
      "ratio":12,
      "attack":0,
      "release":0.25,
      "anmItem":props.anmItem
    }
    this.handleChange=this.handleChange.bind(this)
    this.getDetails=this.getDetails.bind(this)
  }

  handleChange(event){
    const name=event.target.name;
    const value=event.target.value;
    this.setState(function(){
      return {
        [name] : value
      }
    },function(){
      this.props.handleEveryChange(this.state.anmItem.id,{"updatetype":name,"val":value})
      console.log("DynamicsCompressorC>Updated State: ",this.state)
    })
  }

  getDetails=function(){
    return {"threshold":{"min":"-100","max":"0","default":"-24"},
            "knee":{"min":"0","max":"40","default":"30"},
            "ratio":{"min":"1","max":"20","default":"12"},
            "attack":{"min":"0","max":"1","default":"0.003"},
            "release":{"min":"0","max":"1","default":"0.25"}
          };
  }

  render(){
    const obj=this.getDetails()
    return(
      <div>
        <h2> DynamicsCompressorComponent ID in ANM: {this.props.anmItem.id} </h2>
        <br/><input type="range" name="threshold" step="1" min={obj.threshold.min} max={obj.threshold.max} value={this.state.threshold} onChange={(e)=>{this.handleChange(e)}}/> 
        <br/><input type="range" name="knee" step="1" min={obj.knee.min} max={obj.knee.max} value={this.state.knee} onChange={(e)=>{this.handleChange(e)}}/> 
        <br/><input type="range" name="ratio" step="0.5" min={obj.ratio.min} max={obj.ratio.max} value={this.state.ratio} onChange={(e)=>{this.handleChange(e)}}/> 
        <br/><input type="range" name="attack" step="0.005" min={obj.attack.min} max={obj.attack.max} value={this.state.attack} onChange={(e)=>{this.handleChange(e)}}/> 
        <br/><input type="range" name="release" step="0.05" min={obj.release.min} max={obj.release.max} value={this.state.release} onChange={(e)=>{this.handleChange(e)}}/> 
      </div>
    )

  }
}

export default DynamicsCompressorComponent


/*


//Class Dynamics Compressor
class DynamicsCompressor{

  constructor(){
    this.compressor = audioCtx.createDynamicsCompressor();
    this.compressor.threshold.setValueAtTime(-50, audioCtx.currentTime); //default -24: threshhold -100 and 0
    this.compressor.knee.setValueAtTime(40, audioCtx.currentTime); // default 30: knee 0 and 40
    this.compressor.ratio.setValueAtTime(12, audioCtx.currentTime); // def:12 ratio 1 and 20
    this.compressor.attack.setValueAtTime(0, audioCtx.currentTime); //def: 0.003, btw 0 and 1 attack
    this.compressor.release.setValueAtTime(0.25, audioCtx.currentTime); //def 0.25, btw 0 and 1 release
    return this.compressor;
  }

  updateParameters=function(jsonobj){
    //jsonobj={"updatetype":"","val":""}
    var utype=jsonobj.updatetype;
    var uvalue=jsonobj.val;
    if(utype=="threshold"){
      if (uvalue<=this.getDetails().threshold.max && uvalue>=this.getDetails().threshold.min){
        this.compressor.threshold.setValueAtTime(uvalue,audioCtx.currentTime);
        return true;
      }else{
        return false;
      }
    } else if(utype=="knee"){
      if(uvalue<=this.getDetails().knee.max && uvalue>=this.getDetails().knee.min){
        this.compressor.knee.setValueAtTime(uvalue, audioCtx.currentTime);
        return true;
      }else{
        return false;
      }
      // current filtering freq: default is 350 with range from 10 to 0.5*sample rate
    } else if(utype=="ratio"){
      if(uvalue<=this.getDetails().ratio.max && uvalue>=this.getDetails().ratio.min){
        this.compressor.ratio.setValueAtTime(uvalue, audioCtx.currentTime);
        return true;
      }else{
        return false;
      }
      //dB default is zero, set from -40 to +40; -ve gain is attenuation
    } else if(utype=="attack"){
      if(uvalue<=this.getDetails().attack.max && uvalue>=this.getDetails().attack.min){
        this.compressor.attack.setValueAtTime(uvalue,audioCtx.currentTime); //between 0.0001 to 1000
        return true;
      }else{
        return false;
      }
    } else if(utype=="release"){
      if(uvalue<=this.getDetails().release.max && uvalue>=this.getDetails().release.min){
        this.compressor.release.setValueAtTime(uvalue,audioCtx.currentTime);   
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
*/
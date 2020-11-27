import React from "react"

class WaveShaperComponent extends React.Component{
  constructor(props){
    super(props)
    console.log("I: WaveShaper")
    this.state={
      "curve":400,
      "oversample":'4x',
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
      console.log("WaveShaperC>Updated State: ",this.state)
    })
        
  }

  getDetails=function(){
    return {"oversample":["none","2x","4x"],
            "curve":{"min":"0","max":"1000","default":"400"}};
  }

  render(){
    const obj=this.getDetails();
    const typegroup=obj.oversample.map(function(item){
      return <option key={item} name="oversample" value={item}>{item}</option>
    })
    return(
      <div>
        <h2> WaveShaper ID in ANM: {this.props.anmItem.id} </h2>
        <select name="oversample" value={this.state.oversample} onChange={(e)=>this.handleChange(e)}>
          {typegroup}
        </select>
        <br/><input type="range" name="curve" step="1" min={obj.curve.min} max={obj.curve.max} value={this.state.curve} onChange={(e)=>{this.handleChange(e)}}/> 
      </div>
    )

  }
}

export default WaveShaperComponent

/*


//Class WaveShaper
class WaveShaper{
  //DISTORTION BRO
  constructor(){
    this.distortion = audioCtx.createWaveShaper();
    this.distortion.curve = makeDistortionCurve(400); //check how it sounds and map the value from 0 to maybe something
    this.distortion.oversample = '4x';
    return this.distortion;
  }

  makeDistortionCurve=function(amount) {
    var k = typeof amount === 'number' ? amount : 50,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;
    for ( ; i < n_samples; ++i ) {
      x = i * 2 / n_samples - 1;
      curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
    }
    return curve;
  };

  updateParameters=function(jsonobj){
    if(jsonobj.updatetype=="curve"){
      if(jsonobj.val>=this.getDetails().curve.min && jsonobj.val<=this.getDetails().curve.max){
        this.distortion.curve.setValueAtTime(this.makeDistortionCurve(jsonobj.val), audioCtx.currentTime);  
        return true;
      }else{
        return false;
      }
    } else if(jsonobj.updatetype=="oversample"){
      if(this.getDetails().oversample.includes(jsonobj.val)){
        this.distortion.oversample.setValueAtTime(jsonobj.val, audioCtx.currentTime);  
        return true;
      }else{
        return false;
      }
    }
  }

  getDetails=function(){
    return {"oversample":["none","2x","4x"],
            "curve":{"min":"0","max":"1000","default":"400"}};
  }
}//WaveShaper ends



*/
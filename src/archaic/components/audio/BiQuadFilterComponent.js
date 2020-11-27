import React from "react"

class BiQuadFilterComponent extends React.Component{
  constructor(props){
    super(props)
    console.log("I: BQF")
    this.state={
      "type":"lowshelf",
      "frequency":1000,
      "gain":25,
      "q":1,
      "detune":0,
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
      console.log("BQFC>Updated State: ",this.state)
    })        
  }

  getDetails=function(){
    return {"type":["lowpass","highpass","bandpass","lowshelf","highshelf","peaking","notch","allpass"],
            "frequency":{"min":"10","max":"22050","default":"1000"},
            "gain":{"min":"-40","max":"40","default":"25"},
            "q":{"min":"0.0001","max":"1000","default":"1"},
            "detune":{"min":"-1000","max":"1000","default":"0"}
          };
  }

  render(){

    const obj=this.getDetails();
    const typegroup=obj.type.map(function(item){
      return <option key={item} name="type" value={item}>{item}</option>
    })
    return(
      <div>
        <h2> BQF ID in ANM: {this.props.anmItem.id} </h2>
        <select name="type" value={this.state.type} onChange={(e)=>this.handleChange(e)}>
          {typegroup}
        </select>
        <br/><input type="range" name="frequency" step="50" min={obj.frequency.min} max={obj.frequency.max} value={this.state.frequency} onChange={(e)=>{this.handleChange(e)}}/>
        <br/><input type="range" name="gain" step="5" min={obj.gain.min} max={obj.gain.max} value={this.state.gain} onChange={(e)=>{this.handleChange(e)}}/>
        <br/><input type="range" name="q" step="0.001" min={obj.q.min} max={obj.q.max} value={this.state.q} onChange={(e)=>{this.handleChange(e)}}/>
        <br/><input type="range" name="detune" step="50" min={obj.detune.min} max={obj.detune.max} value={this.state.detune} onChange={(e)=>{this.handleChange(e)}}/>
      </div>
    )

  }
}

export default BiQuadFilterComponent

/*

//BiQuadFilterBegins
class BiQuadFilter{

  constructor(){
    this.biquadfilter = audioCtx.createBiquadFilter();
    this.biquadfilter.type="lowshelf";
    this.biquadfilter.frequency=1000;
    this.biquadfilter.gain=25;
    this.biquadfilter.q=1;
    this.biquadfilter.detune=0;
    return this.biquadfilter;
  }

  updateParameters=function(jsonobj){
    //jsonobj={"updatetype":"","val":""}
    var utype=jsonobj.updatetype;
    var uvalue=jsonobj.val;
    if(utype=="type"){
      if (this.getDetails().type.includes(uvalue)){
        this.biquadfilter.type.setValueAtTime(uvalue,audioCtx.currentTime);
        return true;
      }else{
        return false;
      }
    } else if(utype=="frequency"){
      if(uvalue<=this.getDetails().frequency.max && uvalue>=this.getDetails().frequency.min){
        this.biquadfilter.frequency.setValueAtTime(uvalue, audioCtx.currentTime);
        return true;
      }else{
        return false;
      }
      // current filtering freq: default is 350 with range from 10 to 0.5*sample rate
    } else if(utype=="gain"){
      if(uvalue<=this.getDetails().gain.max && uvalue>=this.getDetails().gain.min){
        this.biquadfilter.gain.setValueAtTime(uvalue, audioCtx.currentTime);
        return true;
      }else{
        return false;
      }
      //dB default is zero, set from -40 to +40; -ve gain is attenuation
    } else if(utype=="q"){
      if(uvalue<=this.getDetails().q.max && uvalue>=this.getDetails().q.min){
        this.biquadfilter.Q.setValueAtTime(uvalue,audioCtx.currentTime); //between 0.0001 to 1000
        return true;
      }else{
        return false;
      }
    } else if(utype=="detune"){
      if(uvalue<=this.getDetails().detune.max && uvalue>=this.getDetails().detune.min){
        this.biquadfilter.detune.setValueAtTime(uvalue,audioCtx.currentTime);   
        return true;
      }else{
        return false;
      }
    }
  }

  getDetails=function(){
    return {"type":["lowpass","highpass","bandpass","lowshelf","highshelf","peaking","notch","allpass"],
            "frequency":{"min":"10","max":"22050","default":"350"},
            "gain":{"min":"-40","max":"40","default":"0"},
            "q":{"min":"0.0001","max":"1000","default":"1"},
            "detune":{"min":"-1000","max":"1000","default":"0"}
          };
  }

  getFrequencyResponse=function(){
    var arrvalues=[20,25,31,40,50,63,80,100,125,160,200,250,315,400,500,630,800,1000,1250,1600,2000,2500,3150,4000,5000,6300,8000,10000,12500,16000,20000];
    var myFrequencyArray = new Float32Array(31);
    for(var i=0;i<31;i++){myFrequencyArray[i] = arrvalues[i];}
    var magResponseOutput = new Float32Array(31);
    var phaseResponseOutput = new Float32Array(31);
    biquadFilter.getFrequencyResponse(myFrequencyArray,magResponseOutput,phaseResponseOutput);
    var jsonArr=[];
    for(i = 0; i <= myFrequencyArray.length-1;i++){
      jsonArr.push({"F":myFrequencyArray[i],"M":magResponseOutput[i],"P":phaseResponseOutput[i]})
       //myFrequencyArray[i] + 'Hz Magnitude response value' Phase response in radians.';
    }
    return jsonArr;
  }
}//BiQuadFilter ends
*/
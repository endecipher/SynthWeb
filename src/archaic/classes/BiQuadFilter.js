
//BiQuadFilterBegins
export default class BiQuadFilter{

  constructor(audioCtx){
    this.audioCtx=audioCtx
    this.biquadfilter = audioCtx.createBiquadFilter();
    this.biquadfilter.type="lowshelf";
    this.biquadfilter.frequency.setValueAtTime(1000,audioCtx.currentTime);
    this.biquadfilter.gain.setValueAtTime(25,audioCtx.currentTime);
    this.biquadfilter.q=1;
    this.biquadfilter.detune.setValueAtTime(0,audioCtx.currentTime);
    return this;
  }

  getNode=function(){
    return this.biquadfilter
  }

  updateParameters=function(jsonobj){
    //jsonobj={"updatetype":"","val":""}
    var utype=jsonobj.updatetype;
    var uvalue=jsonobj.val;
    if(utype=="type"){
      if (this.getDetails().type.includes(uvalue)){
        this.biquadfilter.type.setValueAtTime(uvalue,this.audioCtx.currentTime);
        console.log("ClassBQF: Updated",jsonobj)
        return true;
      }else{
        return false;
      }
    } else if(utype=="frequency"){
      if(uvalue<=this.getDetails().frequency.max && uvalue>=this.getDetails().frequency.min){
        this.biquadfilter.frequency.setValueAtTime(uvalue,this.audioCtx.currentTime);
        console.log("ClassBQF: Updated",jsonobj)
        return true;
      }else{
        return false;
      }
      // current filtering freq: default is 350 with range from 10 to 0.5*sample rate
    } else if(utype=="gain"){
      if(uvalue<=this.getDetails().gain.max && uvalue>=this.getDetails().gain.min){
        this.biquadfilter.gain.setValueAtTime(uvalue, this.audioCtx.currentTime);
        console.log("ClassBQF: Updated",jsonobj)
        return true;
      }else{
        return false;
      }
      //dB default is zero, set from -40 to +40; -ve gain is attenuation
    } else if(utype=="q"){
      if(uvalue<=this.getDetails().q.max && uvalue>=this.getDetails().q.min){
        this.biquadfilter.Q.setValueAtTime(uvalue,this.audioCtx.currentTime); //between 0.0001 to 1000
        console.log("ClassBQF: Updated",jsonobj)
        return true;
      }else{
        return false;
      }
    } else if(utype=="detune"){
      if(uvalue<=this.getDetails().detune.max && uvalue>=this.getDetails().detune.min){
        this.biquadfilter.detune.setValueAtTime(uvalue,this.audioCtx.currentTime);   
        console.log("ClassBQF: Updated",jsonobj)
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
    this.biquadFilter.getFrequencyResponse(myFrequencyArray,magResponseOutput,phaseResponseOutput);
    var jsonArr=[];
    for(i = 0; i <= myFrequencyArray.length-1;i++){
      jsonArr.push({"F":myFrequencyArray[i],"M":magResponseOutput[i],"P":phaseResponseOutput[i]})
       //myFrequencyArray[i] + 'Hz Magnitude response value' Phase response in radians.';
    }
    return jsonArr;
  }
}//BiQuadFilter ends

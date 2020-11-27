//Class WaveShaper
export default class WaveShaper{
  //DISTORTION BRO
  constructor(audioCtx){
    this.audioCtx=audioCtx
    this.distortion = audioCtx.createWaveShaper();
    this.distortion.curve = this.makeDistortionCurve(400); //check how it sounds and map the value from 0 to maybe something
    this.distortion.oversample = '4x';
    return this;
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

  getNode=function(){
    return this.distortion
  }

  updateParameters=function(jsonobj){
    if(jsonobj.updatetype=="curve"){
      if(jsonobj.val>=this.getDetails().curve.min && jsonobj.val<=this.getDetails().curve.max){
        this.distortion.curve=this.makeDistortionCurve(jsonobj.val)  
        console.log("ClassWaveShaper: Updated",jsonobj)
        return true;
      }else{
        return false;
      }
    } else if(jsonobj.updatetype=="oversample"){
      if(this.getDetails().oversample.includes(jsonobj.val)){
        this.distortion.oversample = jsonobj.val;
        console.log("ClassWaveShaper: Updated",jsonobj)
        return true;
      }else{
        return false;
      }
    }
  }

  getDetails=function(){
    return {"oversample":["none","2x","4x"],
            "curve":{"min":0,"max":1000,"default":400}};
  }
}//WaveShaper ends

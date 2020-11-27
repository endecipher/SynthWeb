import React from "react"

class ConvolverComponent extends React.Component{
  constructor(props){
    super(props)
    console.log("I: Convolver")
    this.state={
      "type":null,
      "anmItem":props.anmItem
    }
    this.handleChange=this.handleChange.bind(this)
  }

  handleChange(event){
    const name=event.target.name;
    const value=event.target.value;
    this.setState(function(){
      return {
        [name] : value
      }
    },function(){
      console.log("ConvolverC>Updated State: ",this.state)
    })
        
  }

  render(){
    return(
      <div>
        <h2> Convolver ID in ANM: {this.props.anmItem.id} </h2>
      </div>
    )

  }
}

export default ConvolverComponent





/*
class Convolver{
  constructor(){
    var reverb = audioCtx.createConvolver();
    var reverbSoundArrayBuffer = this.base64ToArrayBuffer(impulseResponse);
    audioCtx.decodeAudioData(reverbSoundArrayBuffer, 
      function(buffer) {
        reverb.buffer = buffer;
      },
      function(e) {
        alert('Error when decoding audio data ' + e.err);
    });
  }

  base64ToArrayBuffer=function(base64) {
      var binaryString = window.atob(base64);
      var len = binaryString.length;
      var bytes = new Uint8Array(len);
      for (var i = 0; i < len; i++)        {
          bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes.buffer;
  }
}



*/
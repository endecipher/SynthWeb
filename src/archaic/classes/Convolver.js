//Error for reverb
export default class Convolver{
  constructor(audioCtx,impulseResponse){
    this.reverb = audioCtx.createConvolver();
    this.reverbSoundArrayBuffer = this.base64ToArrayBuffer(impulseResponse);
    audioCtx.decodeAudioData(this.reverbSoundArrayBuffer, 
      function(buffer) {
        this.reverb.buffer = buffer;
      },
      function(e) {
        alert('Error when decoding audio data ' + e.err);
    });
    return this;
  }

  getNode=function(){
    return this.reverb
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
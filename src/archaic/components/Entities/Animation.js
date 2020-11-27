import React from "react"
import Canvas from "./Canvas"
class Animation extends React.Component {
  constructor(props) {
    super(props);
    let bufferLength=props.analyser.frequencyBinCount;
    let dataArray=new Uint8Array(bufferLength)
    let analyser=props.analyser
    analyser.fftSize=2048
    this.state = { 
      "dataArray":dataArray,
      "bufferLength":bufferLength,
      "analyser":analyser
    };
    this.updateAnimationState = this.updateAnimationState.bind(this);
  }
  /*
  static getDerivedStateFromProps(state,props){
    let bufferLength=props.analyser.frequencyBinCount
    let dataArray=new Uint8Array(bufferLength)
    return {
      "dataArray":dataArray,
      "bufferLength":bufferLength,
      "analyser":props.analyser
    }
  }
  */
  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }
  updateAnimationState() {
    let bufferLength=this.state.analyser.frequencyBinCount;
    let dataArray=new Uint8Array(bufferLength)
    this.state.analyser.getByteTimeDomainData(dataArray)
    this.setState({
      "bufferLength":bufferLength,
      "dataArray":dataArray
    });
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }
  render() {
    console.log(this.state)
    console.log(this.state.dataArray)
    return (
        <div style={{"width":"600px","height":"300px"}}>
        <Canvas dataArray={this.state.dataArray} bufferLength={this.state.bufferLength} />;
        </div>
      )
    
  }
}

export default Animation
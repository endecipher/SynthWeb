import React from "react"

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }
  componentDidUpdate() {
    // Draws a square in the middle of the canvas rotated
    // around the centre by this.props.angle
    const dataArray = this.props.dataArray;
    const bufferLength= this.props.bufferLength;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    //ctx.save();
    
    //ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgb(200, 200, 200)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0, 0, 0)";
    ctx.beginPath();

    let sliceWidth=canvas.width*1.0/bufferLength;
    let x=0;
    for(let i=0;i<bufferLength;i++){
      let v=dataArray[i]/128.0;
      let y=v*height/2;

      if(i==0){
        ctx.moveTo(x,y);
      }else{
        ctx.lineTo(x,y);
      }
      x+=sliceWidth
    }
    ctx.lineTo(width,height/2);
    ctx.stroke();
    
    /*
    ctx.translate(width / 2, height / 2);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.fillStyle = '#4397AC';
    ctx.fillRect(-width / 4, -height / 4, width / 2, height / 2);
    ctx.restore();
    */
  }
  render() {
    return <canvas width="300" height="300" ref={this.canvasRef} />;
  }
}

export default Canvas
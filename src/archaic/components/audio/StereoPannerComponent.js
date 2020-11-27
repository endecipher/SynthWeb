import React from "react"

class StereoPannerComponent extends React.Component{
  constructor(props){
    super(props)
    console.log("I: StereoPanner")
    this.state={
      "pan":0,
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
      this.props.handleEveryChange(this.state.anmItem.id,{"updatetype":name,"val":value})
      console.log("StereoPannerC>Updated State: ",this.state)
    })
        
  }

  render(){
    return(
      <div>
        <h2> StereoPanner ID in ANM: {this.props.anmItem.id} </h2>
        <br/><input type="range" name="pan" step="0.1" min="-1" max="1" value={this.state.pan} onChange={(e)=>{this.handleChange(e)}}/> 
      </div>
    )

  }
}

export default StereoPannerComponent

/*
class StereoPanner{

  constructor(){
    this.panNode = audioCtx.createStereoPanner();
    return this.panNode;
  }

  updateParameters=function(jsonobj){
    if(jsonobj.updatetype=="pan"){
      if(jsonobj.val>=this.getDetails().pan.min && jsonobj.val<=this.getDetails().pan.max){
        this.panNode.pan.setValueAtTime(jsonobj.val, audioCtx.currentTime);// range between -1(full Left) to 1 (full right)
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










*/
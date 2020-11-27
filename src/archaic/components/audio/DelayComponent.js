import React from "react"

class DelayComponent extends React.Component{
  constructor(props){
    super(props)
    console.log("I: Delay")
    this.state={
      "delaytime":5.0,
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
      console.log("DelayC>Updated State: ",this.state)
    })
        
  }

  getDetails=function(){
    return {"delaytime":{"min":"0","max":"10.0","default":"5.0"}};
  }

  render(){
    const obj=this.getDetails()
    return(
      <div>
        <h2> delay ID in ANM: {this.props.anmItem.id} </h2>
        <br/><input type="range" name="delaytime" step="0.1" min={obj.delaytime.min} max={obj.delaytime.max} value={this.state.delaytime} onChange={(e)=>{this.handleChange(e)}}/>
      </div>
    )

  }
}

export default DelayComponent





/*
//Class delay begins
class Delay{

  constructor(){
      this.synthDelay=audioCtx.createDelay(5.0);
      return this.synthDelay;
      //delayTime in seconds and its min val is zero, and max is maxDelayTime argument while creating, here it's 5.0
  }

  updateParameters=function(jsonobj){
    if(jsonobj.updatetype=="delaytime"){
      if(jsonobj.val>=this.getDetails().delaytime.min && jsonobj.val<=this.getDetails().delaytime.max){
        this.synthDelay.delayTime.setValueAtTime(jsonobj.val, audioCtx.currentTime);  
        return true;
      }else{
        return false;
      }
    }
  }

  getDetails=function(){
    return {"delaytime":{"min":"0","max":"10.0","default":"5.0"}};
  }
}// Class Delay ends


*/
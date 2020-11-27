import React from "react"
/*
Any component such as Gain or Filter will have their
details (refer the classes made in sketch.js) stored in their 
component's state. Whenever a change is detected, the function 
(same function for all components) passed on to each of the components 
via props will be called from the component with the parameters ID,
for e.g AN1 and the state itself, featuring all changes and values.

thus , update state with new values from event, and pass the id 
and state to the props handler function, 

{ 
"id":"AN1",
"type":"Gain",
"object":null,
"status":false,
"divID":"divan1",
"details":null
}


*/


class GainComponent extends React.Component{
	constructor(props){
		super(props)
		console.log("I: Gain")
    this.state={
      "gain":0.5,
      "anmItem":props.anmItem
    }
    this.updateGain=this.updateGain.bind(this)
	}

  updateGain(event){
    const name=event.target.name;
    const value=event.target.value;
    this.setState(function(){
      return {
        [name] : value
      }
    },function(){
      this.props.handleEveryChange(this.state.anmItem.id,{"updatetype":name,"val":value})
      console.log("GainC>Updated State: ",this.state)
    })
        
  }

	render(){

		return(
			<div>
				<h2> Gain ID in ANM: {this.props.anmItem.id} </h2>
        <br/><input type="range" name="gain" step="0.05" min="0" max="1" value={this.state.gain} onChange={(e)=>{this.updateGain(e)}}/> 
			</div>
		)

	}
}

export default GainComponent

/*
//Class Gain
class Gain{

  constructor(){
    this.gainNode = audioCtx.createGain();
    return this;
  }

  updateParameters=function(jsonobj){
    if(jsonobj.updatetype=="gain"){
      if(jsonobj.val>=this.getDetails().gain.min && jsonobj.val<=this.getDetails().gain.max){
        this.gainNode.gain.setValueAtTime(jsonobj.val, audioCtx.currentTime);  
        return true;
      }else{
        return false;
      }
    }
  }

  getDetails=function(){
    return {"gain":{"min":"0","max":"1","default":"0.5"}};
  }
}//Class Gain ends
*/
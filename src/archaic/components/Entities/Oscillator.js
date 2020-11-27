import React from 'react'
import OscType from "./OscType"
import OscFunc from "./../functions/OscFunctions"
import P5Wrapper from 'react-p5-wrapper'
import KeyboardSketch from './../functions/KeyboardSketch'

//reference OscFunc.getFreqForKey() whenever calling

class Oscillator extends React.Component{

	constructor(props){
		super(props)
		this.state={
			"context":this.props.audioCtx
		}
		console.log("Compiled Osc");
		this.getKey=this.getKey.bind(this);
	}

	getKey(){
		console.log("Got Key:", arguments[0]);
		this.props.getPressedDetails(arguments[0],arguments[1]);
	}

	componentWillReceiveProps(newProps){
		this.setState({
			"pressedkeys":newProps.pressedkeys
		})
	}	

	render(){
		return(
		<div>
			<div className="oscbuttonholder">
				<OscType getOscType={this.props.getOscType} />
			</div>
			<div id="keyboardholder">
				<P5Wrapper sketch={KeyboardSketch} getKey={this.getKey} pressedkeys={this.props.pressedkeys}/>
		
			</div>
		</div>
		)
	}
	
}

export default Oscillator
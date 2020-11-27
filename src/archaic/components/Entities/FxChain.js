import React from "react"
import AudioNodeManager from "./AudioNodeManager"

class FxChain extends React.Component{
	constructor(props){
		super(props)
		this.state={
			"context":null
		}
	}

	static getDerivedStateFromProps(props,state){
		return {
			"context": props.audioCtx
		}
	}

	render(){
		return(
			<div>
				{console.log("Check state's context:",this.state)}
      			<AudioNodeManager oscanalyser={this.props.oscanalyser} audioCtx={this.props.audioCtx}/>
			</div>
		)
	}
}

export default FxChain
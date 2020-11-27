import React from 'react'
import DefineInput from "./DefineInput"
import OscJson from "./../static/OscJson.json"

class OscType extends React.Component{

	constructor(){
		super()
		this.state={
			"selectedType":null
		}
		this.handleChange=this.handleChange.bind(this)
	}

	handleChange(id){
		//this.props.getOscType
		this.setState({
			"selectedType":id
		}, function(){
			console.log("Received:",id," selectedType:",this.state.selectedType);
			let type="";
			switch(this.state.selectedType){
				case "1": type="sine"; break;
				case "2": type="triangle"; break;
				case "3": type="square"; break;
				case "4": type="sawtooth"; break;
			}
			return this.props.getOscType(type)
		})
		
	}

	render(){
		const group=OscJson.map(item => <DefineInput key={item.index} params={item} handleChange={this.handleChange}/>)
		return(
		<div className="osctypeC">
			<h1>Hello</h1>
				{group}
		</div>
		)	
	}
}

export default OscType

/*


I really loved the learning experience with Hasura online felowship and Sir, I would like to explore the developer job profiule more would like to explore a full opportunity in Hasura Sir are you the could you please guide me to the right person with whom I could talk to? 
*/
import React from 'react'
import List from './../static/ListOfNodes'

class AddNewNode extends React.Component{	
	constructor(){
		super()
		this.state={
			value:"",
			options:List
		}
		this.handleChange=this.handleChange.bind(this)
		console.log("I: AddNewNode")
	}

	componentDidMount(){
		this.setState(function(prevState){			
			return {
				value:"Gain"
			}
		})
		console.log("AddNewNode> Mounted")
	}

	handleChange(event) {
		this.setState({value: event.target.value},function(){
			console.log("AddNewNode> handleChange state value",this.state.value)
		});
	}

	render() {

	let i=0;	
	return (
	  <form>
	    <label>
	      Add another Audio Node:
	      <select value={this.state.value} onChange={this.handleChange}>
	        {this.state.options.map(function(item){
	        	return <option key={i++} value={item}>{item}</option>
	        })}
	      </select>
	    </label>
	    <button type="button" value="Submit" onClick={() => this.props.addNode(this.state.value)}>Add</button>
	  </form>
	);
	}
}	

export default AddNewNode
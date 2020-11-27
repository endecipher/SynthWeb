import React from "react"

class Counter extends React.Component{
	
	constructor(){
		super()
		this.state={
			count:0
		}
		this.updateCount=this.updateCount.bind(this)
	}

	updateCount(){
		this.setState(function(prevState){
			return {
				count: prevState.count+1
			}
		})
				
	}

	render(){
		return(
			<div>
				<h1>{this.state.count}</h1>
				<button onClick={this.updateCount} type="button"> Change </button>
			</div>
		)
	}
}

export default Counter 
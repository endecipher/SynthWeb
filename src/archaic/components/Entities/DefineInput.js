import React from 'react'

/*
params={
	"type":"radio",
	"class":"//styleCLass name",
	"varname":"osctype",
	"varvalue":"sine or triangle",
	"text":"Sine"
}

*/
function DefineInput(props){
	
	return(
		<div>
		<input  
			type={props.params.type} 
			className={props.params.class} 
			name={props.params.varname}
			value={props.params.varvalue}
			defaultChecked={props.params.checked}
			onChange={function(){return props.handleChange(props.params.index)}}
			/>
		{props.params.text}
		</div>	
	
	)	
	
}

export default DefineInput
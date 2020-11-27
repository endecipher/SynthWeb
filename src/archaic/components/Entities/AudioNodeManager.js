import React from "react"
import AddNewNode from "./AddNewNode"
import Oscillator from "./Oscillator"
import Osc from "./../classes/Oscillator"
import OscFunc from './../functions/OscFunctions'

//AudioNodeClasses
import Gain from './../classes/Gain'
import BiQuadFilter from './../classes/BiQuadFilter'
import Delay from './../classes/Delay'
import DynamicsCompressor from './../classes/DynamicsCompressor'
import Convolver from './../classes/Convolver'
import StereoPanner from './../classes/StereoPanner'
import WaveShaper from './../classes/WaveShaper'

//AudioNodeComponents
import GainComponent from "./audio/GainComponent"
import BiQuadFilterComponent from "./audio/BiQuadFilterComponent"
import DelayComponent from "./audio/DelayComponent"
import DynamicsCompressorComponent from "./audio/DynamicsCompressorComponent"
import ConvolverComponent from "./audio/ConvolverComponent"
import StereoPannerComponent from "./audio/StereoPannerComponent"
import WaveShaperComponent from "./audio/WaveShaperComponent"

//AnimationCanvas
import Animation from"./Animation"

class AudioNodeManager extends React.Component{
	
	constructor(props){
		super(props)
		//{"id":index,"osc":obj,"details":jsonObj}
		this.oscarray=[]
		/*
		{	
			"id":"AN1",
			"type":"Gain",
			"object":null,
			"status":false,
			"divID":"divan1",
			"details":null
		}
		*/
		this.state={
			"order":[
			/*
			{	
				"id":"AN1",
				"type":"Gain",
				"object":null,
				"status":false,
				"divID":"divan1",
				"details":null
			}*/
			],
			"context":null,
			"osctype":"sine",
			"osmanalyser":null,
			//aa"visualanalyser":null,
			"pressedkeys":[
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false
			]
		}
		this.getNewID=this.getNewID.bind(this)
		this.addNode=this.addNode.bind(this)
		this.connectUpdate=this.connectUpdate.bind(this)
		this.getOscType=this.getOscType.bind(this)
		this.getStateDetails=this.getStateDetails.bind(this)
		this.handlePitchChange=this.handlePitchChange.bind(this)
		this.handleKeyDown=this.handleKeyDown.bind(this)
		this.handleEveryChange=this.handleEveryChange.bind(this)
		this.handleKeyUp=this.handleKeyUp.bind(this)
		
		console.log("I: AudioNodeManager");
	}

	static getDerivedStateFromProps(props,state){
		return {
			"context": props.audioCtx,
			"osmanalyser":props.oscanalyser
		}
		
	}
	
	//Gets New ID from OrderArray for dynamic creation
	//Of more AudioNodes
	getNewID(){
		let arr=this.state.order;
		let max=0;
		for(let i=0;i<arr.length;i++){
			let num=parseInt(arr[i].id.substring(2))
			if(max<num){
				max=num
			}
		}
		console.log("Returning New ID:", max+1);
		return max+1
	}

	/*
		This function gets the value select from select 
		box after clicking the add button in AddNode
		It then creates a new Object of the class
		of that AudioNode and updates the state to include
		the new object's JSON in this.state.order so that
		we can render from this.state.order ezily 		
	*/
	addNode(value){
		console.log("ANM: Select Audio Node received: ",value)
		let nodename=value.toString();
		let newNodeObject= null;
		console.log(this.state.context)
		if(nodename=="Gain"){
			newNodeObject=new Gain(this.state.context)
			console.log("GainObj",newNodeObject)
		}else if(nodename=="BiQuadFilter"){
			newNodeObject=new BiQuadFilter(this.state.context)
			console.log("BQFObj",newNodeObject)
		}else if(nodename=="Convolver"){
			newNodeObject=new Convolver(this.state.context)
			console.log("ConvObj",newNodeObject)
		}else if(nodename=="Delay"){
			newNodeObject=new Delay(this.state.context)
			console.log("DelayObj",newNodeObject)
		}else if(nodename=="DynamicsCompressor"){
			newNodeObject=new DynamicsCompressor(this.state.context)
			console.log("DynCompObj",newNodeObject)
		}else if(nodename=="StereoPanner"){
			newNodeObject=new StereoPanner(this.state.context)
			console.log("StereoPannerObj",newNodeObject)
		}else if(nodename=="WaveShaper"){
			newNodeObject=new WaveShaper(this.state.context)
			console.log("WaveShaperObj",newNodeObject)
		}
		console.log("D> NewNodeObject:", newNodeObject)
		let details=newNodeObject.getDetails();
		let newID=this.getNewID()
		var jsonObj={
			"id": "AN"+newID,
			"type": nodename,
			"object": newNodeObject,
			"status":true,
			"divID": "DIVAN"+newID,
			"details":details
		}

		this.setState(function(prevState){
			return {"order":[...prevState.order, jsonObj]}
		},function(){
			//After updating order, update Connection
			this.connectUpdate()
		})
	}

	getOscType(val){
		console.log("Type ANM: ", val);
		//working
		this.setState(function(prevState){
			return {"osctype":val}
		},function(){
			this.getStateDetails()
		})
	}

	getStateDetails(){
		console.log("State Details:", this.state);
	}

	connectUpdate(){
		const arr=this.state.order
		let prevItem=this.state.osmanalyser
		let nextItem=null
		for(let item in arr){
			nextItem=arr[item].object.getNode()
			prevItem.connect(nextItem)
			prevItem=nextItem
		}
		//Connect Last Node in Order
		prevItem.connect(this.state.context.destination)
		console.log("ANM> ConnectUpdate ORDER: State is>", this.state);
		//this.forceUpdate()
	}

	handleKeyDown(event){
		this.connectUpdate()
		let key=event.key
		let index=OscFunc.getIndexForKey(key)
		if(this.state.pressedkeys[index]==false && OscFunc.getFreqForKey(key)!=-1){
			this.state.pressedkeys[index]=true
			console.log("KeyDown>",key," ",index," ",this.state.pressedkeys[index])
			let jsonObj=OscFunc.createJSONDetails(this.state.osctype,OscFunc.getFreqForKey(key),key)	
			let obj=new Osc(this.state.context, this.state.osmanalyser, jsonObj);
			this.oscarray.push({"id":index,"osc":obj,"details":jsonObj})
			obj.play();
		}
		console.log("KeyDown Arr:",this.state.pressedkeys)
	}

	handleKeyUp(event){
		let key=event.key
		let index=OscFunc.getIndexForKey(key)
		if(index!=-1){
			let arr=this.oscarray
			for(let item in arr){
				if(arr[item].id==index){
					arr[item].osc.stop()
					this.oscarray.splice(item, 1);
				}
			}
			this.state.pressedkeys[index]=false
			
			console.log("KeyUp>",key," ",index," ",this.state.pressedkeys[index])
			console.log("KeyUp Arr:",this.state.pressedkeys)	
		}else{
			//do Nothing
		}
	}

	handlePitchChange(){
		console.log("PitchChange> ",arguments);
	}

	handleEveryChange(){
		const targetid=arguments[0];
		const updatejson=arguments[1];
		console.log(this.state.order)
		const arr=this.state.order;
		for(let item in arr){
			if(arr[item].id==targetid){
				arr[item].object.updateParameters(updatejson)
				console.log("HandleEveryChange> ID:",targetid," | ",updatejson) 
				break;
			}
		}
	}

/*
	Initialized audio ctx from app.js
	We have created an AudioNodeManager which controls
	everything from the oscillator start to
	the audioCtx.destination connections

	AudioNodeManager is holding a this.oscarray 
	so that we can start adding Oscillators to the
	array, and creation of Oscillators is handled
	only by the event handlers onKeyDown and onKeyUp

	An AnalyserNode is extracted from props which 
	will remain in the middle of the Oscillators 
	and the user FxChain creation, so that 
	we can add all new audio nodes
*/
	render(){	
	const mapNodes={
	"BiQuadFilter":BiQuadFilterComponent,	
	"Gain":GainComponent,
	"Delay":DelayComponent,
	"DynamicsCompressor":DynamicsCompressorComponent,
	"Convolver":ConvolverComponent,
	"StereoPanner":StereoPannerComponent,
	"WaveShaper":WaveShaperComponent,
	"Analyser":Animation}	
	
	const fxchain=this.state.order.map(function(item){
		const typename=item.type;
		let Tagname=mapNodes[typename];
		return <Tagname key={item.id} anmItem={item} handleEveryChange={this.handleEveryChange} />
	},this)		

	let animation=null
	if(this.state.osmanalyser!=null){
		animation=<Animation analyser={this.state.osmanalyser}/> 
	}

		return(
			<div tabIndex="0" onKeyPress={this.handleKeyPress} onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp}>
				<h1>MyAPP</h1>
				<Oscillator audioCtx={this.state.context} getOscType={this.getOscType} pressedkeys={this.state.pressedkeys}/>
				{fxchain}
				<AddNewNode addNode={this.addNode}/>
				{animation}
			</div>
		)
	}

}

export default AudioNodeManager 


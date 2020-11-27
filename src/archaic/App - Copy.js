import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import Counter from "./components/Counter"
import OscillatorClass from "./classes/Oscillator"
import FxChain from "./components/FxChain"

class App extends Component {

  constructor(){
    super()
    this.state={
      "context":null,
      "oscanalyser":null
    }
  }

  componentDidMount(){
    let audioCtx= new (window.AudioContext || window.webkitAudioContext)();
    this.setState({"context":audioCtx});
    let oscanalyser=audioCtx.createAnalyser()
    this.setState({
      "oscanalyser":oscanalyser
    },function(){console.log("App> init osmanalyser")})
    // const script = document.createElement("script");
    // script.src = "./p5.min.js";
    // script.async = true;
    // document.body.appendChild(script);
  }

  render() {
    return (

      /*
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      */
      <div>
      <FxChain audioCtx={this.state.context} oscanalyser={this.state.oscanalyser} />
      <br/>
      <hr/>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.8.0/p5.min.js"></script>
      </div>
    );
  }
}

export default App;

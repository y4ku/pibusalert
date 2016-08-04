import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      predictions: null
    }
    this.getPredictions = this.getPredictions.bind(this);
    this.getPredictions();
    debugger
    setInterval(this.getPredictions, (30 * 1000));
  }
  getPredictions() {
    fetch('http://192.168.1.25:9000/prediction', {
      method: 'get'
    }).then(function(response) {
      return response.json();
    }).then((json) => {
      this.setState({predictions: json});
    })
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1> Raspberry Pi Bus Alert </h1>
        </div>
        {this.state.predictions ? 
          <h1> Bus {this.state.predictions.bus} incoming in {this.state.predictions.time}</h1> 
          : 
          null
        }
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import LandingPage from './homepage/Landing';
import Nav from './homepage/nav';

class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <LandingPage name="raj"/>
        <div id="player"></div>
      </div>
    );
  }
}

export default App;

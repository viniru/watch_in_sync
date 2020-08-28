import React, { Component } from 'react';
import './App.css';
import LandingPage from './homepage/Landing';
import Nav from './homepage/nav';
import Youtube from './homepage/Youtube'

class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <LandingPage/>
        <div id="player"></div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import LandingPage from './homepage/Landing';

class App extends Component {
  constructor(props){
    super(props);
    this.username = this.makeid(4);
  }

  render() {
    return (
      <div>
        <LandingPage username={this.username}/>
      </div>
    );
  }

  makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  
}


export default App;

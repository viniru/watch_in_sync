import React, {Component} from 'react';
import { BrowserRouter as Router, Switch , Route } from 'react-router-dom';
import Nav from './nav';
import Player from './Player'
import {Redirect} from 'react-router-dom'
import Pusher from 'pusher-js/with-encryption';
import YouTube from 'react-youtube';



class LandingPage extends Component {
    constructor(props){
      super(props);
      this.state = {
        roomCreated : false
      }
      this.host = false;
      this.token = null;
      this.username = "vinayak";
      this.videoUrl = "2g811Eo7K8U";
      this.token = null;
      this.hosturl = "http://localhost:9000";
      this.createRoomUrl = this.hosturl + "/createRoom";
      this.joinRoomUrl = this.hosturl + "/joinRoom";
      this.updateUrl = this.hosturl + "/updateUrl";
      this.updateStateUrl = this.hosturl + "/updateState";
      this.initUserUrl = this.hosturl + "/init";
      this.syncUrl = this.hosturl + "/sync";
      this.authUrl = this.hosturl + "/user/auth";
    }



    enablePusher = (channel, ishost) => {
          var pusher = new Pusher('b0c7f76e11d1d09b4d50', {
              cluster: 'ap2'
          });
          var channel = pusher.subscribe(channel);

          if(!ishost)
          channel.bind('updateState', this.updateState);

          if(!ishost)
          channel.bind('updateVideoUrl', function(data) {
              console.log(data);
              //player.cueVideoById(this.state.videoUrl,0);
          });

          if(ishost)
             channel.bind('sync', this.syncWithHost);
  }

  createRoom = () => {
    let show = this.state.roomCreated;
    let linkaddress = '/room/'+this.roomId;
    var createroom=<div>
      <center>
        <button id="button" onClick={this.onCreateRoom} className="createRoomStyle">CREATE ROOM</button>
      </center>
      </div>
      

    return show === true ?
    <div><Redirect to={{pathname:linkaddress, state:{host:true}}} />
    </div>:
    createroom;
    
  }


  joinRoom = ({match}) => {
    this.enablePusher(match.params.id, this.host);

    // complete join room functionality

    return <Player host={this.host}></Player>
    
  }


  onCreateRoom = () => {

    var res = {status: "ERROR"};
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({hostname: this.username})
      };

      fetch(this.createRoomUrl, requestOptions)
      .then(async response => {
          const data = await response.json();
          
          if (!response.ok) {
          const error = (data && data.message) || response.status;
                return Promise.reject(error);
          }
          
          this.roomId = await data.roomId;
          this.host = true;
          res.status = "OK";
          this.setState({roomCreated : true});

      })
      .catch(error => {
          console.log('There was an error!', error);
      });

  }


  


  render() {
    return <div>
      <Nav/>
      <Router>
        <Switch>
          <Route path="/"  exact component={this.createRoom}/>
          <Route path="/room/:id" exact component={this.joinRoom}/>
        </Switch>
      </Router>
    </div>

}
}


export default LandingPage;
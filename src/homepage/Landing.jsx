import React, {Component} from 'react';
import { BrowserRouter as Router, Switch , Route } from 'react-router-dom';
import Nav from './nav';
import Player from './Player'
import {Redirect} from 'react-router-dom'
import Pusher from 'pusher-js/with-encryption';



class LandingPage extends Component {
    constructor(props){
      super(props);
      this._child = React.createRef();
      this.state = {
        roomCreated : false
      }
      this.roomId = null
      this.host = false;
      this.token = null;
      this.username = this.props.username;
      this.token = null;
      this.hosturl = "http://localhost:9000";
      this.createRoomUrl = this.hosturl + "/createRoom";
      this.joinRoomUrl = this.hosturl + "/joinRoom";
      this.updateVideoUrl = this.hosturl + "/updateUrl";
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
          channel.bind('updateVideoUrl', (data) =>{
              console.log(data);
              this._child.current.updateVideoUrl(data)
          });

          if(ishost)
             channel.bind('sync', this.syncWithHost);

          console.log("pusher enabled");
  }

  updateState = (data) => {
      this._child.current.updateState(data)
  }

  triggerUpdateVideoUrl = (data) => {
    console.log(this)
    data.roomId = this.roomId;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    console.log("hello")
    console.log()
    console.log(this.updateVideoUrl);
    fetch(this.updateVideoUrl, requestOptions)
  }

  sync = (roomId) => {
    var data = {"roomId" : roomId}
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    fetch(this.syncUrl, requestOptions)
  }


  syncWithHost = () => {
    var data = this._child.current.getDataForSync()
    data.hostname = this.username;
    data.roomId = this.roomId;
    console.log(data)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    fetch(this.updateStateUrl, requestOptions)
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
    <div><Redirect to={{pathname:linkaddress, state:{host:true}}} /></div>:
    createroom;
    
  }


  joinRoom = ({match}) => {
    this.roomId = match.params.id;
    var host = this.host;
    var data = JSON.stringify({hostname: this.username, roomId: this.roomId});

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data
    };

    fetch(this.joinRoomUrl, requestOptions).then( async response => {
        const data = await response.json();
        console.log(data)
        this.enablePusher(this.roomId, host)
        let videoUrl = data.url;
        this._child.current.updateUrl({host: this.host, videoUrl: videoUrl});
        this.sync(this.roomId)
      }
    );
  
    return <Player host={this.host} videoUrl={null} ref={this._child} updateFunc={this.sendUpdateInfo} triggerUpdateVideoUrl={this.triggerUpdateVideoUrl}></Player>
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
          
          this.roomId = data.roomId;
          this.host = true;
          res.status = "OK";
          this.setState({roomCreated : true});

      })
      .catch(error => {
          console.log('There was an error!', error);
      });

  }

  sendUpdateInfo = (data) => {
    data.hostname = this.username;
    data.roomId = this.roomId;
    console.log(data)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    fetch(this.updateStateUrl, requestOptions)
  }



  render() {
    return <div>
      <Nav/>
      <Router>
        <Switch>
          <Route path="/"  exact component={this.createRoom}/>
          while(this.roomCreated === false);
          <Route path="/room/:id" exact component={this.joinRoom}/>
        </Switch>
      </Router>
    </div>

}
}


export default LandingPage;
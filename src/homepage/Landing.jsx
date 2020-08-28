import React, {Component} from 'react';
import { BrowserRouter as Router, Switch , Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Nav from './nav';
import Player from './Player'
import Youtube from './Youtube'

class LandingPage extends Component {
    constructor(props){
      super(props);
      this.state = {
        roomCreated : false
      }
    }

    onCreateRoom = () => {
      this.setState({roomCreated : true})
      ReactDOM.render(<Player/>, document.getElementById("player"));
    }

    onJoinRoom = ({match}) => {
      alert('on join room ' + match.params.id);
      return <Player/>
    }

    createRoom = () => {
      let show = this.state.roomCreated;
      var createroom=<center><button id="button" onClick={this.onCreateRoom} className="createRoomStyle">CREATE ROOM</button></center>

      return show === true ?
      null:
      createroom;
      
    }

    render() {

        var myroutes=
        <Switch>
            <Route path="/"  exact component={this.createRoom}/>
            <Route path="/joinroom/:id" exact component={this.onJoinRoom}/>
        </Switch>

        var myrouter=<Router>
            {myroutes}
        </Router>


        var myrender=<div>
          <Nav/>
          {myrouter}
        </div>

        return myrender;

    }
  }



export default LandingPage;
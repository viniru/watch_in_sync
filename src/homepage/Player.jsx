import React,{Component} from 'react';
import Youtube from './Youtube';
import './Player.css';

class Player extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            show : true,
            videoUrl : "2g811Eo7K8U",
            player : {
                videoUrl : "2g811Eo7K8U",
                height: '390',
                width: '640',
                playerVars: {
                  // https://developers.google.com/youtube/player_parameters
                  autoplay: 1
                }
              }
        };
        this.host = false;
        this.videoUrl = "2g811Eo7K8U";
        this.token = null;
        this.hosturl = "http://127.0.0.1:9000";
        this.createRoomUrl = this.hosturl + "/createRoom";
        this.joinRoomUrl = this.hosturl + "/joinRoom";
        this.updateUrl = this.hosturl + "/updateUrl";
        this.updateStateUrl = this.hosturl + "/updateState";
        this.initUserUrl = this.hosturl + "/init";
        this.syncUrl = this.hosturl + "/sync";
        this.authUrl = this.hosturl + "/user/auth";
    }

    render() {
        var videolink = <div className='streamUrl'>
            <input type="text" id="videourl" onChange={this.streamUrlChange} placeholder="Enter Youtube Url Here" style={{marginRight:20}}></input>
            <button onClick={this.onStream}> stream </button>
        </div>
        var player =<center><div>  {videolink} 
        <Youtube
         videoUrl={this.state.videoUrl}
         _onReady = {this._onReady}
         player = {this.state.player}
         />   </div></center> 
        let show = this.state.show;
        return show === true ? player : null;
    }

    onStream = () => {
        let newState = {
            show : true,
            videoUrl:  document.getElementById("videourl").value
        }
        this.setState(newState)
    }


    _onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.cueVideoById(this.state.player.videoUrl, 0);
      }

    
}

export default Player;
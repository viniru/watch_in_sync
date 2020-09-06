import React,{Component} from 'react';
import YouTube from 'react-youtube';
import './Player.css'


class Player extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            show : true,
            videoUrl : "2g811Eo7K8U",
            player : {
                height: '390',
                width: '640',
                playerVars: {
                  // https://developers.google.com/youtube/player_parameters
                  autoplay: 1
                }
              }
        };
        this.enablePusher = this.enablePusher;
        this.host = this.props.host == null ? false : true;
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

        console.log(this.state)

        const opts = this.state.player;
        var videolink = <div className='streamUrl'>
            <input type="text"  id="videourl" onChange={this.streamUrlChange} placeholder="Enter Youtube Url Here" style={{marginRight:20}}></input>
            <button onClick={this.onStream}> stream </button>
        </div>

        var player =<center><div>  {videolink} 
        <YouTube
         videoId={this.state.videoUrl} 
         opts={opts} 
         onReady={this._onReady}
         onStateChange={this._onStateChange}
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
        event.target.cueVideoById(this.state.videoUrl, 0);
      }


    _onStateChange = (event) => {
        if(!this.host)
            return;
        var data = JSON.stringify({state: event.data, time: event.target.getCurrentTime(), hostname: "vinayak", roomId: "1"});
        //var states = [YouTube.PAUSED, YouTube.PLAYING];
        var states = [1, 2];
        if (states.includes(event.data)) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };
            fetch(this.updateStateUrl, requestOptions)
        }
    }

    
}

export default Player;
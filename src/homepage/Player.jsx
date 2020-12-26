import React,{Component} from 'react';
import YouTube from 'react-youtube';
import './Player.css'


class Player extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            show : true,
            player : {
                height: '390',
                width: '640',
                playerVars: {
                  // https://developers.google.com/youtube/player_parameters
                  autoplay: 1
                }
              },
            
        };
        this.videoUrl = props.videoUrl !== null ? props.videoUrl : "n3g_RlXslxE",
        this.player = null  
        this.host = this.props.host !== null? this.props.host : true;
    }

    render() {
        
        const opts = this.state.player;
        var videolink = <div className='streamUrl'>
            <input type="text"  id="videourl" onChange={this.streamUrlChange} placeholder="Enter Youtube Url Here" style={{marginRight:20}}></input>
            <button onClick={this.onStream}> stream </button>
        </div>

        var player =<center><div>  {videolink} 
        <YouTube
         videoId={this.videoUrl} 
         opts={opts} 
         onReady={this._onReady}
         onStateChange={this._onStateChange}
         />   </div></center> 

        let show = this.state.show;
        return show === true ? player : null;
    }

    onStream = () => {
        // let newState = {
        //     show : true,
        //     videoUrl:  
        // }
        // this.setState(newState)

        this.videoUrl = document.getElementById("videourl").value;
        this.player.cueVideoById(this.videoUrl)
        
        if(this.host)
        this.props.triggerUpdateVideoUrl({"videoUrl" : this.videoUrl});
    }

    updateUrl = (data) => {
        this.host = data.host;
        this.videoUrl = data.videoUrl;
        this.setState(this.state);
    }

    updateVideoUrl = (data) => {
        this.videoUrl = data.videoUrl;
        this.player.cueVideoById(this.videoUrl)
        this.setState(this.state)
    }


    _onReady = (event) => {
        // access to player in all event handlers via event.target
        this.player = event.target;
        this.player.cueVideoById(this.videoUrl);
      }


    _onStateChange = (event) => {
        if(!this.host)
            return;
        var data = {state: event.data, time: event.target.getCurrentTime()};
        //var states = [YouTube.PAUSED, YouTube.PLAYING];
        var states = [1, 2, 5];
        if (states.includes(event.data)) {
            this.props.updateFunc(data)
        }
    }

    updateState = (data) => {
        console.log(data);
        if(data.videoUrl !== null && data.videoUrl !== this.videoUrl){
            var newState = this.state;
            this.videoUrl = data.videoUrl
            this.setState(newState);
        }
        if (data.state === 2 || data.state === 5) {
            this.player.pauseVideo();
            this.player.seekTo(data.time);
        } else if (data.state === 1) {
            this.player.seekTo(data.time);
            this.player.playVideo();
        }
    }

    getDataForSync = () => {
       return {state: this.player.getPlayerState(), time: this.player.getCurrentTime()}
    }
    

}

export default Player;
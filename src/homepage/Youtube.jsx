import React from 'react';
import YouTube from 'react-youtube';
 
class Youtube extends React.Component {
  render(props) {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        videoUrl: this.props.videoUrl
      }
    };

    
 
    return <YouTube 
    videoId={this.props.videoUrl} 
    opts={opts} 
    onReady={this._onReady}
    
    />;
  }
 
}

export default Youtube;
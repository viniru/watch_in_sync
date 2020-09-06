import React from 'react';
import YouTube from 'react-youtube';
 
class Youtube extends React.Component {
  render(props) {
    const opts = this.props.player;
 
    return <YouTube 
    videoId={this.props.videoUrl} 
    opts={opts} 
    onReady={this.props._onReady}
    
    />;
  }
 
}

export default Youtube;
import React,{Component} from 'react';
import Youtube from './Youtube';

class Player extends Component {
    constructor(props){
        super(props);
        this.state = {
            show : true
        }
    }

    render() {
        var player = <div>   <Youtube/>   </div>
        let show = this.state.show;
        return show === true ? player : null;
    }
}

export default Player;
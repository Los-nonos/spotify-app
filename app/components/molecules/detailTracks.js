import React from 'react';

class DetailsTracks extends React.Component{
    constructor(props){
        super(props);
        this.nameTrack = props.nameTrack;
        this.artists = props.artists;
        this.explicit = props.explicit;
        this.state = {
            artist: '',
            explicit: '',
        }        
    }

    componentDidMount() {
        this.renderArtist();
        this.renderExplicit();
    }

    renderArtist = () => {
        var ret = '';
        const list = this.artists;
        var cnt = list.length;
        if(cnt > 1){
            for (var index = 0; index < cnt; index++) {
                if(index === cnt - 1){
                    ret = ret + list[index].name;
                }
                else{
                    ret = ret + list[index].name + ', ';
                }                
            }
        }
        else{
            ret = list[0].name;
        }

        this.setState({artist: ret});
    }

    renderExplicit = () => {
        var ret = '';
        if(this.explicit){
            ret = 'Explicit';
        }
        else{
            ret = '';
        }
        this.setState({explicit: ret});
    }

    render(){
        return(
            <div id="track">
                <h6 className="four columns" id="name-track">{this.nameTrack}</h6>
                <p className="four columns" id="explicit-track">{this.state.explicit}</p>
                <p className="four columns">{this.state.artist}</p>
            </div>
        );
    }
}

export default DetailsTracks;
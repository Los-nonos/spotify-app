import React from 'react';
import DetailTracks from '../Components/detailTracks';

class Album extends React.Component{
    constructor(props){
        super(props);
        this.token = '';
        this.uriAlbum = '';
        this.state = {
            name: '',
            artists: this.renderArtists([{name: ''}]),
            tracks: this.renderTracks([]),
            total_track: '',
            image: '',
            popularity: '',
            label: '',
        }
    }

    componentDidMount(){
        this.getToken();
        this.getUriArtist();

        this.getAlbum();
    }

    getAlbum = async () =>{
        var miInit ={
            method: 'GET',
               headers: {
                   Authorization: "Bearer " + this.token,
               },
               mode: 'cors',
               cache: 'default'
        }
        const response = await fetch('https://api.spotify.com/v1/albums/' + this.uriAlbum, miInit);
        const data = await response.json();

        if(response.status === 200){
            this.setState({
                name: data.name,
                artists: this.renderArtists(data.artists),
                tracks: this.renderTracks(data.tracks.items),
                total_track: data.total_tracks,
                image: data.images[0].url,
                popularity: data.popularity,
                label: data.label,
            });
        }
        else if(response.status === 401){
            alert("token invalid or expired!");
        }
    }

    renderTracks = (tracks) => {
        const list = tracks;
        const array = list.map((item, index) => {
            return <DetailTracks key={index} artists={item.artists} 
                        nameTrack={item.name} explicit={item.explicit} />
        });
        console.log(array);
        return array;
    }

    renderArtists = (array) => {
        var ret = '';
        const list = array;
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
        return ret;
    }

    getUriArtist = () => {
        const uriAlbum = window.location.hash.split('&').filter(function(el)
                            { 
                                if(el.match('url')!==null)
                                {return true;}
                            })[0].split('=')[1];

        this.uriAlbum = uriAlbum;
    }

    getToken = () => {
        const token = window.location.hash.split('&').filter(function(el)
                            { 
                                if(el.match('access_token')!==null)
                                {return true;}
                            })[0].split('=')[1];

        this.token = token;
    }

    render(){
        return(
        <div className="row">
            <div className="six columns" id="info-album">
                <img src={this.state.image} id="image-profile-album" />
                <h5>Name: {this.state.name}</h5>
                <h5>Artists: {this.state.artists}</h5>
                <h5>Popularity: {this.state.popularity}</h5>
                <h6>{this.state.label}</h6>
                <h6>Tracks: {this.state.total_track}</h6>
            </div>
            <div className="six columns" id="list-tracks">
                <div className="row" id="header-tracks">
                    <h6 className="three columns" id="header-track">Track</h6>
                    <h6 className="three columns"></h6>
                    <h6 className="four columns" id="header-artist">Artist</h6>
                </div>
                {this.state.tracks}
            </div>
        </div>
        );
    }
}

export default Album;
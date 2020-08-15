import React from 'react';
import DetailAlbums from '../components/molecules/detailAlbums';
import DetailTracks from '../components/molecules/detailTracks';

class Artist extends React.Component{
    constructor(props){
        super(props);
        this.uriArtist;
        this.token;
        this.state = {
            name: '',
            followers: '',
            popularity: '',
            gender: '',
            image: '',
            albums: this.renderAlbums([]),
            singles: this.renderAlbums([]),
            topTracks: this.renderTracks([]),
        }
    }

    componentDidMount(){
        
        this.getToken();
        this.getUriArtist();
        
        this.getInfoArtist();
        this.getAlbumsArtist();
        this.getTopTracksArtist();
    }

    getInfoArtist = async () => {
        var miInit ={
            method: 'GET',
               headers: {
                   Authorization: "Bearer " + this.token,
               },
               mode: 'cors',
               cache: 'default'
        }
        
        const response = await fetch('https://api.spotify.com/v1/artists/' + this.uriArtist, miInit);
        const data = await response.json();

        if(response.status === 200){

            const popularity = data.popularity;
            const name = data.name;
            const followers = data.followers.total;
            const gender = this.renderGenders(data.genres);
            const image = data.images[0].url;

            this.setState({
                name: name, popularity: popularity, followers: followers, image: image, gender: gender
            });
        }
        else if(response.status === 401){
            alert("token invalid");
        }
    }

    getAlbumsArtist = async () => {
        var miInit ={
            method: 'GET',
               headers: {
                   Authorization: "Bearer " + this.token,
               },
               mode: 'cors',
               cache: 'default'
        }
        const responseAlbums = await fetch('https://api.spotify.com/v1/artists/' + this.uriArtist + '/albums?include_groups=album%2Ccompilation&limit=5', miInit);
        const dataAlbums = await responseAlbums.json();
        
        const responseSingles = await fetch('https://api.spotify.com/v1/artists/' + this.uriArtist + '/albums?include_groups=single&limit=5', miInit)
        const dataSingles = await responseSingles.json();

        if(responseAlbums.status === 200){
            if(dataAlbums.items.length !== 0){
                var albumsClears= [];                
                var albumsjsx = [];
                var albums = dataAlbums.items;
                for (var index = 0; index < 5; index++) 
                {
                    var albumClear = {
                        authors: albums[index].artists,
                        name_album: albums[index].name,
                        cnt_tracks: albums[index].total_tracks,
                        url: albums[index].uri,
                        image_album: albums[index].images[0].url,
                    }
                    albumsClears.push(albumClear);
                }
                if(albumsClears.length !== 0){
                    albumsjsx.push(this.renderAlbums(albumsClears));
                    if(albumsClears.length === 5){
                        albumsjsx.push( <div id="show-all-albums" onClick={this.showAllAlbums}>
                                        <p>Show all compilations</p>
                                    </div>);
                    }                    
                    this.setState({albums: albumsjsx});
                }
                else{
                    this.setState({albums: <div><h5>Ups</h5><p>parece que este artista no tiene compilaciones</p></div>})
                }             
            }                                     
        }
        if(responseSingles.status === 200){
            if(dataSingles.items.length !== 0){
                var singlesClears = [];
                var singlesjsx = [];
                var singles = dataSingles.items;

                for (var index = 0; index < 5; index++) {                    
                    var albumClear = {
                        authors: singles[index].artists,
                        name_album: singles[index].name,
                        cnt_tracks: singles[index].total_tracks,
                        url: singles[index].uri,
                        image_album: singles[index].images[0].url,
                    }
                    singlesClears.push(albumClear);
                }

                if(singlesClears.length !== 0){                    
                    singlesjsx.push(this.renderSingles(singlesClears));
                    if(singlesClears.length === 5){
                        singlesjsx.push(<div id="show-all-albums" onClick={this.showAllSingles}>
                                        <p>Show all singles</p>
                                    </div>);
                    }                    
                    this.setState({singles: singlesjsx});
                }
                else{
                    this.setState({singles: <div><h5>Ups</h5><p>parece que este artista no tiene singles</p></div>})                
                }
            }                        
        }
        else if(responseAlbums.status === 401 || responseSingles.status === 401){
            alert("token invalid or expired!");
        }
        else{
            this.setState({albums: <div><h5>Ups</h5><p>parece que este artista no tiene compilaciones ni singles</p></div>})
        }
    }

    getTopTracksArtist = async () => {
        var miInit ={
            method: 'GET',
               headers: {
                   Authorization: "Bearer " + this.token,
               },
               mode: 'cors',
               cache: 'default'
        }
        const response = await fetch('https://api.spotify.com/v1/artists/' + this.uriArtist + '/top-tracks?country=AR', miInit);
        const data = await response.json();

        if(response.status === 200){
            var tracksClears = [];
            var tracks = data.tracks;

            for (var index = 0; index < 8; index++) {
                var trackClear = {                    
                    artistsTopTracks: tracks[index].artists,
                    nameTrack: tracks[index].name,
                    url: tracks[index].id,
                    explicit: tracks[index].explicit,
                }
                tracksClears.push(trackClear);
            }
            this.setState({topTracks: this.renderTracks(tracksClears)});
        }
    }

    renderGenders = (genres) => {
        console.log(genres);
        var ret = '';
        const list = genres;
        var cnt = list.length;
        if(cnt > 1){
            for (var index = 0; index < cnt; index++) {
                if(index === cnt - 1){
                    ret = ret + list[index];
                }
                else{
                    ret = ret + list[index] + ', ';
                }                
            }
        }
        else{
            ret = list[0].name;
        }
        return ret;
    }

    renderTracks = (tracks) => {
        const list = tracks;
        const array = list.map((item, index) => {
            return <DetailTracks key={index} artists={item.artistsTopTracks} 
                        nameTrack={item.nameTrack} explicit={item.explicit} />
        });
        return array;
    }

    renderAlbums = (albums) => {
        const list = albums;
        const array = list.map((item, index) => {
            return <DetailAlbums key={index} id={item.url} OnClickChange={this.clickAlbum} 
                        authors={item.authors} image={item.image_album} 
                        cnt_tracks={item.cnt_tracks} name_album={item.name_album} />
        });
        return array;
    }

    renderSingles = (singles) => {
        const list = singles;
        const array = list.map((item, index) => {
            return <DetailAlbums key={index} id={item.url} OnClickChange={this.clickSingles} 
                        authors={item.authors} image={item.image_album} 
                        cnt_tracks={item.cnt_tracks} name_album={item.name_album} />
        });
        return array;
    }

    getUriArtist = () => {
        const uriArtist = window.location.hash.split('&').filter(function(el)
                            { 
                                if(el.match('url')!==null)
                                {return true;}
                            })[0].split('=')[1];

        this.uriArtist = uriArtist;
    }

    getToken = () => {
        const token = window.location.hash.split('&').filter(function(el)
                            { 
                                if(el.match('access_token')!==null)
                                {return true;}
                            })[0].split('=')[1];

        this.token = token;
    }

    clickAlbum = (id) => {
        window.location.assign("http://localhost:3000/album#access_token="+
                    this.token+"&url=" + id.split(':')[2]);
    }

    clickSingles = (id) => {
        window.location.assign("http://localhost:3000/single#access_token="+
                    this.token+"&url=" + id.split(':')[2]);
    }

    showAllAlbums = () => {
        window.location.assign("http://localhost:3000/albums#access_token="+
                    this.token+"&url=" + this.uriArtist);
    }

    showAllSingles = () => {
        window.location.assign("http://localhost:3000/singles#access_token="+
                    this.token+"&url=" + this.uriArtist);
    }

    render(){
        return(
            <div>
                <div className="row">
                    <div className="six columns" id="info-artist">
                        <img src={this.state.image} id="image-profile-artist" />
                        <h5>Name: {this.state.name}</h5>
                        <h5>Followers: {this.state.followers}</h5>
                        <h5>Popularity: {this.state.popularity}</h5>
                        <h5>Genders: {this.state.gender}</h5>
                    </div>
                    <div className="six columns" id="list-tracks">
                        <div className="row" id="header-tracks">
                            <h6 className="three columns" id="header-track">Track</h6>
                            <h6 className="three columns"></h6>   
                            <h6 className="four columns" id="header-artist">Artist</h6>
                        </div>                        
                        {this.state.topTracks}                 
                    </div>
                </div>
                <h4>Albums</h4>
                <div className="row" id="albums-artist">
                        {this.state.albums}
                </div>
                <h4>Singles</h4>
                <div className="row" id="singles-artist">
                    {this.state.singles}
                </div>
            </div>
        );
    }
}

export default Artist;
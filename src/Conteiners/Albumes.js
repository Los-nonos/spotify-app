import React from 'react';
import DetailAlbums from '../Components/detailAlbums';

class Album extends React.Component{
    constructor(props){
        super(props);
        this.token = '';
        this.uriArtist = '';
        this.state = {
            albums: this.renderAlbums([]),
        }
    }

    componentDidMount()
    {
        this.getToken();
        this.getUriArtist();

        this.getAlbumsArtist();
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
        const response = await fetch('https://api.spotify.com/v1/artists/' + this.uriArtist + '/albums?include_groups=compilation%2Calbum', miInit);
        const data = await response.json();

        if(response.status === 200){
            if(data.items.length !== 0)
            {
                var albumsClears = [];
                var albumsShowder = [];
                var cnt = data.items.length / 5;
                for (var index = 0; index < cnt; index++)
                {
                    if(data.items.length >= 5){
                        for (var index2 = 0; index2 < 5; index2++) {
                            var albumClear = {
                                authors: data.items[index2].artists,
                                name_album: data.items[index2].name,
                                cnt_tracks: data.items[index2].total_tracks,
                                url: data.items[index2].uri,
                                image_album: data.items[index2].images[0].url,
                            }                    
                            albumsClears.push(albumClear);                                                
                        }
                    }
                    else{
                        for (var index2 = 0; index2 < data.items.length; index2++) {
                            var albumClear = {
                                authors: data.items[index2].artists,
                                name_album: data.items[index2].name,
                                cnt_tracks: data.items[index2].total_tracks,
                                url: data.items[index2].uri,
                                image_album: data.items[index2].images[0].url,
                            }                    
                            albumsClears.push(albumClear);                                                
                        }
                    }
                    albumsShowder.push(this.renderAlbums(albumsClears));
                    data.items.splice(0, 4);
                    albumsClears = [];                
                }
                this.setState({albums: albumsShowder});
            }
        }
        else if(response.status === 401){
            alert("token invalid or expired!");
        }
    }

    renderAlbums = (albums) => {
        const list = albums;
        const array = list.map((item, index) => {
            return <DetailAlbums key={index} id={item.url} OnClickChange={this.clickAlbum} 
                        authors={item.authors} image={item.image_album} 
                        cnt_tracks={item.cnt_tracks} name_album={item.name_album} />
        });
        return (<div className="row" id="list-albums">{array}</div>);
    }

    getUriArtist = () => {
        const uriArtist = window.location.hash.split('&').filter(function(el)
                            { 
                                if(el.match('url')!==null)
                                {return true;}
                                return false;
                            })[0].split('=')[1];

        this.uriArtist = uriArtist;
    }

    getToken = () => {
        const token = window.location.hash.split('&').filter(function(el)
                            { 
                                if(el.match('access_token')!==null)
                                {return true;} return false;
                            })[0].split('=')[1];

        this.token = token;
    }

    clickAlbum = (id) => {
        window.location.assign("http://localhost:3000/album#access_token="+
                    this.token+"&url=" + id.split(':')[2]);
    }

    render(){
        return(
            <div id="conteiner-albums-artist">
                {this.state.albums}
            </div>
        );
    }
}

export default Album;
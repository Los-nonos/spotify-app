import React from 'react';
import InputBrowser from '../molecules/inputBrowser';
import DetailArtist from '../molecules/detailArtist';

class Browser extends React.Component{
    constructor(props){
        super(props);
        this.token = '';
        this.state = {
            input: '',
            details: [],
            artistRow1: this.renderArtist([]),
            artistRow2: this.renderArtist([]),
        }
    }    

    getToken = () => {
        var token = window.location.hash.split('&').filter(function(el) 
                        { 
                            if(el.match('access_token') !== null) 
                            {return true; }
                        })[0].split('=')[1];
        this.token = token;
    }

    textChange = async (e) => {
        this.setState({input: e, artistRow1: null, artistRow2: null});
        this.connectSpotifyAPI();
    }

    connectSpotifyAPI = async () => {

        if(this.state.input !== '')
        {
            var miInit = { method: 'GET',
               headers: {
                   Authorization: "Bearer " + this.token,
               },
               mode: 'cors',
               cache: 'default'
            };

            var url = "https://api.spotify.com/v1/search?q=" + this.state.input +"*&type=artist";
            var response = await fetch(url, miInit);
            var data = await response.json();

            if(response.status === 401){
                alert("authentication token invalid");            
            }
            else if(response.status === 200)
            {
                var artistas = data.artists.items;
                var listComplete = [];
                var listArtist = [];
                var list2Artist = [];

                for (var index = 0; index < 8; index++) {
                    var clearArtist = {
                        popularity: artistas[index].popularity,
                        name: artistas[index].name,
                        followers: artistas[index].followers.total,
                        gender: artistas[index].genres,
                        image: artistas[index].images[0],
                        url: artistas[index].uri
                    };
                    listComplete.push(clearArtist);
                    if(index < 4){
                        listArtist.push(clearArtist);
                    }
                    else{
                        list2Artist.push(clearArtist);
                    }
                    
                }
                const array = this.renderArtist(listArtist);
                const array2 = this.renderArtist(list2Artist);
                this.setState({artistRow1: array, artistRow2: array2, details: listComplete});
            }
        }
        else{
            this.setState({artistRow1: null, artistRow2: null});
        }
    }

    componentDidMount(){
        this.getToken();
    }

    clickArtist = (name) => {
        const list = this.state.details;
        if(list.length > 0){
            for (var index = 0; index < list.length; index++) {
                if(list[index].name === name){
                    window.location.assign("http://localhost:3000/artist#access_token="+
                    this.token+"&url="+list[index].url.split(':')[2]);
                }
            }
        }
    }

    renderArtist = (details) => {
        const list = details;
        const array = list.map((item, index) => {
            return <DetailArtist key={index} OnClickChange={this.clickArtist} 
                        name={item.name} image={item.image} />
        });
        console.log(array);
        return array;
    }

    render(){        
        return(
            <div>
                <div className="row" id="search-conteiner">
                    <InputBrowser onTextChange={this.textChange} />
                </div>
                <div>
                    <div className="row" id="artists-conteiner">
                        {this.state.artistRow1}
                    </div>
                    <div className="row" id="artists-conteiner">
                        {this.state.artistRow2}
                    </div>
                </div>
            </div>            
        );
    }
}

export default Browser;
import React from 'react';

class DetailsAlbums extends React.Component{
    constructor(props){
        super(props);
        this.authors = props.authors;
        this.name_album = props.name_album;
        this.cnt_tracks = props.cnt_tracks;
        this.image = props.image;
        this.click = props.OnClickChange;
        this.id = props.id;
        this.state = {
            artists: '',
            cnt_tracks: '',
        }
    }

    componentDidMount(){
        this.renderArtist();
        this.renderCntTracks();
    }

    renderArtist = () =>{
        var ret = '';
        if(this.authors.length > 1){
            for (var index = 0; index < this.authors.length; index++) {
                if(index === this.authors.length - 1){
                    ret += this.authors[index].name;
                }
                else{
                    ret += this.authors[index].name + ', ';
                }
            }            
        }
        else{
            ret = this.authors[0].name;
        }
        this.setState({artists: ret});
    }

    renderCntTracks = () => {
        var cnt = this.cnt_tracks;
        if(cnt > 1){
            cnt += " tracks";
        }
        else{
            cnt += " track";
        }
        this.setState({cnt_tracks: cnt});
    }

    onClickChange = () => {
        this.click(this.id);
    }

    render(){
        return(
            <div onClick={this.onClickChange} id="album">
                <img src={this.image} alt="100px" id="image-album"/>
                <h6>{this.name_album}</h6>
                <p>{this.state.artists}</p>
                <p>{this.state.cnt_tracks}</p>
            </div>
        );
    }
}

export default DetailsAlbums;
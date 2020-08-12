import React from 'react';

class Artist extends React.Component
{
    constructor(props){
        super(props);

        this.name = props.name;
        this.image = props.image;
        this.click = props.OnClickChange;
    }

    onClickChange = () => {
        this.click(this.name);
    }

    render(){
        return(
            <div id="artist" onClick={this.onClickChange}>
                <img src={this.image.url} alt="100px" id="image-artist"/>
                <h6>Name: {this.name}</h6>
            </div>
        );
    }
}

export default Artist;
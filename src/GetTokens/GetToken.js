import React from 'react';
import LoadingPage from './LoadingPage';
import './src/style.css';

class GetToken extends React.Component{
    
    componentDidMount(){
        window.location.assign(
            encodeURI(
                'https://accounts.spotify.com/authorize?client_id=ed22631c2d5f4abbaabdd3a5ce707287&response_type=token&redirect_uri=http://localhost:3000/search'
                ));
    }

    render(){
        return(
            <div id="load-conteiner">
                <div id="load">
                    <LoadingPage />
                </div>                
            </div>
        )
    }
}

export default GetToken;
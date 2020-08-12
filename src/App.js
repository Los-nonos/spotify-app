import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import GetToken from './GetTokens/GetToken'
import ArtistSeach from './Browser/artistBrowser'
import Albums from './Conteiners/Albumes';
import Album from './Conteiners/Album';
import Artist from './Conteiners/Artist';
import Singles from './Conteiners/Singles';
import Single from './Conteiners/Single';
// import NotFoundPage from '../src/Components/NotFoundPage'

import './css/normalize.css';
import './css/skeleton.css'
import './css/style.css'

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={GetToken} />
        <Route path="/search" exact component={ArtistSeach} />
        <Route path="/artist" exact component={Artist} />
        <Route path="/album" exact component={Album} />
        <Route path="/albums" exact component={Albums} />
        <Route path="/singles" exact component={Singles} />
        <Route path="/single" exact component={Single} />
        {/* <Route component={NotFoundPage}/> */}
      </Router>
    );
  }
}

export default App;
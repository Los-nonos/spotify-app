import React from 'react';
import {Route, Switch, Redirect, BrowserRouter as Router} from 'react-router-dom';

//import './styles/css/material-dashboard-react.css';
// eslint-disable-next-line import/no-cycle
import authStorage from './services/localStorage/authStorage';
import GetToken from "./containers/LoginPage";
import ArtistSearch from "./components/organisms/artistBrowser";
import Artist from "./containers/Artist";
import Album from "./containers/Album";
import Albums from "./containers/Albumes";
import Singles from "./containers/Singles";
import Single from "./containers/Single";
import RedirectPage from "./containers/RedirectPage";

const App = () => (
    <Switch>
        <Route path="/auth/login-page" exact component={GetToken} />
        <Route path="/auth/redirect" exact component={RedirectPage} />
        <Route path="/search" exact component={ArtistSearch} />
        <Route path="/artist" exact component={Artist} />
        <Route path="/album" exact component={Album} />
        <Route path="/albums" exact component={Albums} />
        <Route path="/singles" exact component={Singles} />
        <Route path="/single" exact component={Single} />
        {authStorage.getSession() ? (
            <Redirect from="/" to="/app" />
        ) : (
            <Redirect from="/" to="/auth/login-page" />
        )}
    </Switch>
);

export default App;

import LoadingPage from "../components/molecules/Loader/loader";
import React from "react";
import { connect } from 'react-redux';
import GridContainer from "../components/atoms/Grid/GridContainer";
import GridItem from "../components/atoms/Grid/GridItem";
import * as actions from '../actions/GeneralActions';

class RedirectPage extends React.Component {
    constructor(props) {
        super(props);
        this.dispatch = props.dispatch;
    }

    componentDidMount() {
        this.getToken();
    }

    getToken = () => {
        const token = window.location.hash.split('&').filter(function(el)
        {
            return el.match('access_token') !== null;
        })[0].split('=')[1];

        this.token = token;
        this.dispatch(actions.saveToken(token));
    }

    render() {
        return (
            <GridContainer>
                <GridItem>
                    <LoadingPage />
                </GridItem>
            </GridContainer>
        )
    }
}

const mapStateToProps = state => {
    return state.generalReducer;
}

export default connect(mapStateToProps)(RedirectPage);
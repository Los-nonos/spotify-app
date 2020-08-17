import React from "react";
import InputBrowser from "../molecules/inputBrowser";
import ContainerArtists from "./Artists/ContainerArtists";
import * as actions from "../../actions/SearchActions";
import GridContainer from "../atoms/Grid/GridContainer";
import GridItem from "../atoms/Grid/GridItem";

class Browser extends React.Component {
  constructor(props) {
    super(props);
    this.token = "";
    this.state = {
      input: ""
    };
  }

  textChange = async e => {
    this.dispatch(actions.searchArtists(this.state.input));
    this.setState({ input: e });
  };

  componentDidMount() {
    this.getToken();
  }
  render() {
    return (
      <div>
        <div className="row" id="search-conteiner">
          <InputBrowser onTextChange={this.textChange} />
        </div>
        <GridContainer>
          <GridItem>
            <ContainerArtists />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default Browser;

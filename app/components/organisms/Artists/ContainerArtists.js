import React from "react";
import { connect } from "react-redux";
import DetailArtist from "../../molecules/detailArtist";

class ContainerArtists extends React.Component {
  renderArtist = () => {
    return this.props.artists.map((item, index) => {
      return (
        <DetailArtist
          key={index}
          OnClickChange={this.clickArtist}
          name={item.name}
          image={item.image}
        />
      );
    });
  };

  //move to pages and redirect
  clickArtist = name => {
    const list = this.state.details;
    if (list.length > 0) {
      for (var index = 0; index < list.length; index++) {
        if (list[index].name === name) {
          window.location.assign(
            "http://localhost:3000/artist#access_token=" +
              this.token +
              "&url=" +
              list[index].url.split(":")[2]
          );
        }
      }
    }
  };

  render() {
    return <div>{this.renderArtist()}</div>;
  }
}

const mapStateToProps = state => {
  return state.searchReducer;
};

export default connect(mapStateToProps)(ContainerArtists);

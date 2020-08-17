import Api from "./api";
import searchAdapter from "../adapters/searchAdapter";

class Search {
  search = async input => {
    var url = "";

    let response;
    try {
      response = await Api.get(
        `https://api.spotify.com/v1/search?q=${input}*&type=artist`
      );
    } catch (err) {
      response = err;
    }

    return searchAdapter.search(response);
  };
}

export default new Search();

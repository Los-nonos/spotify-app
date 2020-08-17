import { actionNames } from "../utils/constants/actionConstants";

export const defaultState = {
  artists: []
};

const searchReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionNames.searchArtistSuccessfully:
      return { ...state, artists: action.artists };
    default:
      return state;
  }
};

export default searchReducer;

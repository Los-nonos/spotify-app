import { actionNames } from "../utils/constants/actionConstants";

export function searchArtists(input) {
  return {
    type: actionNames.searchArtist,
    input
  };
}

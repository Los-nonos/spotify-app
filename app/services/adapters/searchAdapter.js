import { isError } from "../../utils/helpers/isError";
import { actionNames } from "../../utils/constants/actionConstants";
import artistPresenter from "../../utils/presenters/artistPresenter";

class SearchAdapter {
  searchAdapter = response => {
    const { data, status } = response;

    if (isError(status)) {
      return {
        type: actionNames.searchArtistFail,
        error: data
      };
    }

    return {
      type: actionNames.searchArtistSuccessfully,
      artists: artistPresenter.transform(data)
    };
  };
}

export default new SearchAdapter();

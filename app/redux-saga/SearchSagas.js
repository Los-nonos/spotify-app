import { call, put, all } from "redux-saga/effects";
import search from "../services/api/search";
import * as generalActions from "../actions/GeneralActions";
import { pages, redirectTo } from "../utils/helpers/redirectTo";

export function* searchArtist(action) {
  const { input } = action;
  put(generalActions.showLoader());
  const res = yield call(search.search, input);

  if (res.error) {
    if (res.error.status === 401 || res.error.status === 403) {
      put(generalActions.hideLoader());
      redirectTo(pages.login);
    } else {
      put(generalActions.hideLoader());
      put(generalActions.showNotification("", res.error.message));
    }
  } else {
    put(generalActions.hideLoader());
    put(res);
  }
}

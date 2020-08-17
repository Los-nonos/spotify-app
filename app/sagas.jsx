import { all, takeLatest } from "redux-saga/effects";
import { actionNames } from "./utils/constants/actionConstants";
import { saveToken } from "./redux-saga/AuthSagas";

const sagas = [
  takeLatest(actionNames.saveToken, saveToken),
  takeLatest(actionNames.searchArtist, searchArtist)
];

export default function* rootSaga() {
  yield all(sagas);
}

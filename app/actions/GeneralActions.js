import { actionNames } from "../utils/constants/actionConstants";

export function hideLoader() {
  return {
    type: actionNames.hideLoader
  };
}

export function showLoader() {
  return {
    type: actionNames.showLoader
  };
}

export function saveToken(token) {
  return {
    type: actionNames.saveToken,
    token
  };
}

export function showNotification(message, error = undefined) {
  return {
    type: actionNames.showNotification,
    message,
    error
  };
}

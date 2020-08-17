import {actionNames} from "../utils/constants/actionConstants";

export function showNotification(message, error = undefined) {
    return {
        type: actionNames.showNotification,
        message,
        error
    };
}
import authStorage from "../services/localStorage/authStorage";
import {pages, redirectTo} from "../utils/helpers/redirectTo";

export function* saveToken(action) {
    const { token } = action;

    authStorage.setSession(token);

    redirectTo(pages.search)
}
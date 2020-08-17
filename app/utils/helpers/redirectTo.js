import { push } from '../../config/history';

export const redirectTo = path => {
    push(path);
};

export const redirectToWithState = (path, state) => {
    push(path, state);
};

export const pages = {
    login: '/auth/login-page',
    error: '/auth/error',
    search: '/search'
};

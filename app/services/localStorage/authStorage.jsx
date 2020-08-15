import localStorageService from './localStorageService';
// eslint-disable-next-line import/no-cycle
import { actionNames } from '../../utils/constants/actionConstants';
// eslint-disable-next-line import/no-cycle
import { dispatch } from '../../app';

class AuthStorage {
    setSession = (token) => {
        localStorageService.set('auth-token', token);
    };

    getSession = () => {
        return localStorageService.get('auth-token');
    };
}

export default new AuthStorage();

import * as auth from './auth.reducers';
import { LoginModel } from '../../app/models/login.model';

export interface AuthState {
    isAuthenticated: boolean;
    user: LoginModel;
    errorMessage: string;
}

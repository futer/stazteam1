import * as auth from './auth.reducers';
import { LoginModel } from '../../app/models/login.model';
import { ErrorData } from 'src/document/models/error.model';

export interface AuthState {
    isAuthenticated: boolean;
    user: LoginModel;
    errorMessage: ErrorData;
}


import { UserModel } from '../../../app/models/user.model';
import { ErrorData } from 'src/document/models/error.model';

export interface AuthState {
    isAuthenticated: boolean;
    user: UserModel;
    errorMessage: ErrorData;
}

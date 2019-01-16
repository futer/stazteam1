import { UserModel } from '../models/user.model';
import { ErrorData } from '../models/error.model';

export interface State {
    loading: boolean;
    loaded: boolean;
    users: UserModel[] | null;
    errorMessage: ErrorData | null;
}

import { UserModel } from '../../app/models/user-editor.model';
import { ErrorData } from '../models/error.model';

export interface State {
    loading: boolean;
    loaded: boolean;
    users: UserModel | null;
    errorMessage: ErrorData | null;
    sending: boolean;
    sent: boolean;
}

import { UserModel } from '../models/user.model';
import { ErrorData } from '../models/error.model';

export interface State {
    errorMessage: ErrorData | null;
    sending: boolean;
    sent: boolean;
}

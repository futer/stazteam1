import { LoginModel } from 'src/app/models/login.model';


export interface State {
    isAuthenticated: boolean;
    user: LoginModel;
    errorMessage: string;
}

export const initialState: State = {
    isAuthenticated: false,
    user: null,
    errorMessage: null
};

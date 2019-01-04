export interface RegisterModel {
    email: string;
    passwordGroup: {
        password: string;
        repeatPassword: string;
    };
    firstName: string;
    lastName: string;
    pic?: string;
}

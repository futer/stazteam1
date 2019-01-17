export interface UserModel {
    data: {
        users: Array<User>
    };
}


export interface User {
    firstName: string;
    lastName: string;
    password: string;
    pic: string;
}

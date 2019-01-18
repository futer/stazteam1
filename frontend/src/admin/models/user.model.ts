export interface UserModel {
    data: {
        users: Array<UserWithoutPass>
    };
}


export interface User {
    id: string;
    firstName: string;
    lastName: string;
    password: string;
    pic: string;
}

export interface UserWithoutPass {
    id: string;
    firstName: string;
    lastName: string;
    pic: string;
}

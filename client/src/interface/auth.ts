export interface LoginUserData {
    username: string;
    password: string;
}

export interface RegisterUserData {
    username: string;
    password: string;
    name: string;
}

export interface UserData {
    _id: string;
    username: string;
    password: string;
    name: string;
}
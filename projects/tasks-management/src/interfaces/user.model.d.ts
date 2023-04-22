export interface UserModel {
    email: string;
    password?: string;
    fullname?: string;
}

export interface LoginModel {
    email: string;
    password: string;
}
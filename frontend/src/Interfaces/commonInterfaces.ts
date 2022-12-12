
export interface ILogIn{
    email: string,
    password: string,
}

export interface ISignUp extends ILogIn {
    confirmPassword: string
}

export interface IUser{
    username: string,
    _id: string,
    email: string,
    password: string,
    role: string,
    status: string
}
export interface IAttendance{
    user_id: string,
    date: Date | string,
    entry: Date | string,
    exit: Date | string,
}
export interface ILogIn{
    email: string,
    password: string,
}

export interface ISignUp extends ILogIn {
    confirmPassword: string
}

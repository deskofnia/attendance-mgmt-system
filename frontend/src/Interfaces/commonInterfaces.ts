
export interface ILogIn{
    email: string,
    password: string,
}

export interface ISignUp extends ILogIn {
    username: string,
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
    _id: string,
    user_id: string,
    date: string,
    entry: string,
    exit: string,
    clockInHours: number,
    clockOutHours: number,
    totalHours: number,
    status: string
}

export interface IRequest {
    attendance_id: string,
    _id: string,
    user_id: string,
    status: string,
    remarks: string,
}
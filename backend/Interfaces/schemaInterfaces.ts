import { Schema } from "mongoose";

export interface IUser{
    username: string,
    email: string,
    password: string,
    role: string,
    status: string
}

export interface IAttendance{
    user_id: Schema.Types.ObjectId,
    date: Date | string,
    entry: Date | string,
    exit: Date | string,
}
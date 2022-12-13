import { Schema } from "mongoose";

export interface IUser {
    username: string,
    email: string,
    password: string,
    role: string,
    status: string
}

export interface IAttendance {
    user_id: Schema.Types.ObjectId,
    date: string,
    entry: string,
    exit: string,
}

export interface IRequest {
    user_id: Schema.Types.ObjectId,
    attendance_id: Schema.Types.ObjectId,
    status: string,
    reason: string,
}
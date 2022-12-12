import mongoose, { Schema } from "mongoose";
import { IAttendance } from "../Interfaces/schemaInterfaces";

const userSchema = new mongoose.Schema<IAttendance>({
    
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users"
    },
    date:{
        type:Date,
        default:Date.now,
    },
    entry:{type:Date},
    exit:{
      type:Date,
    }
});

export const Attendance = mongoose.model<IAttendance>("attendance", userSchema);
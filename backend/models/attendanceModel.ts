import mongoose, { Schema } from "mongoose";
import { IAttendance } from "../Interfaces/schemaInterfaces";

const userSchema = new mongoose.Schema<IAttendance>({
    
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users"
    },
    date:{
        type:String,
        // default:Date.now,
    },
    entry:{
      type:String
    },
    exit:{
      type:String,
    }
});

export const Attendance = mongoose.model<IAttendance>("attendances", userSchema);
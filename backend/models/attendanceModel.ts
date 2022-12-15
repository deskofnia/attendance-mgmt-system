import mongoose, { Schema } from "mongoose";
import { IAttendance } from "../Interfaces/schemaInterfaces";

const attendanceSchema = new mongoose.Schema<IAttendance>({
    
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users"
    },
    date:{
        type:String,
    },
    entry:{
      type:String,
    },
    exit:{
      type:String,
    },
    clockInHours:{
      type:Number,
    },
    clockOutHours:{
      type:Number,
    },
    totalHours:{
      type:Number,
    },
    status:{
      type: String,
    },
    fromdate:{
      type:String,
    },
    todate:{
      type:String,
    }
});

export const Attendance = mongoose.model<IAttendance>("attendances", attendanceSchema);
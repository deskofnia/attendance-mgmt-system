import mongoose, { Schema } from "mongoose";
import { IRequest } from "../Interfaces/schemaInterfaces";

const reqSchema = new mongoose.Schema<IRequest>({
    
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users"
    },
    attendance_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "attendances"
    },
    status:{
        type:String,
    },
    remarks:{
        type:String,
    }
});

export const Req = mongoose.model<IRequest>("requests", reqSchema);
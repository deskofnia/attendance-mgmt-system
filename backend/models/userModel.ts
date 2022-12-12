import mongoose from "mongoose";
import { IUser } from "../Interfaces/schemaInterfaces";

const userSchema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        unique: false,
      },
      role: {
        type: String,
      },
      status: {
        type: String,
      }
});

export const User = mongoose.model<IUser>("users", userSchema);
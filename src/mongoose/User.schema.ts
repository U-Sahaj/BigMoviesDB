import { Schema } from "mongoose";
import { IUser } from "../interfaces/IUser";

export const userSchema = new Schema<IUser>({
  id: { type: String, required: true },
});
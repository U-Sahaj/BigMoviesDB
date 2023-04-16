import { Schema } from "mongoose";
import { IUserPreference } from "../interfaces/IUserPreference";

export const userPreferenceSchema = new Schema<IUserPreference>({
  userId: { type: String, required: true },
  preferred_languages: { type: [String], required: true },
  favourite_actors: { type: [String], required: true },
  favourite_directors: { type: [String], required: true },
});
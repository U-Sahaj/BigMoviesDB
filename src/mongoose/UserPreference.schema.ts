import { IUserPreference } from "../interfaces/IUserPreference";
import { Schema } from "mongoose"

export interface UserPreferenceDocument extends IUserPreference, Document {};

export const userPreferenceSchema = new Schema<UserPreferenceDocument>({
  userId: { type: String, required: true },
  favouriteActors: [{ type: String }],
  favouriteDirectors: [{ type: String }],
  preferredLanguages: [{ type: String }]
});

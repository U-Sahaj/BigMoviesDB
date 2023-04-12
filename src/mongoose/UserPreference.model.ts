import { model } from "mongoose";
import { UserPreferenceDocument, userPreferenceSchema } from "./UserPreference.schema";

export const userPreferenceModel = model<UserPreferenceDocument>('UserPreferences', userPreferenceSchema);

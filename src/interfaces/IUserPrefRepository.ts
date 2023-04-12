import { IUserPreference } from "./IUserPreference";

export interface IUserPrefRepository {
  getUserPreferences(userId: string): IUserPreference | undefined
}
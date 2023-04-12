import { UserPreference } from "../valueobjects/UserPreference";

export interface IUserPrefRepository {
  getUserPreferences(userId: string): UserPreference | undefined
}
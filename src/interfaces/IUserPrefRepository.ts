import { UserPreferences } from "../valueobjects/UserPreferences";

export interface IUserPrefRepository {
  getUserPreferences(userId: string): UserPreferences | undefined
}
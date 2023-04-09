import { UserPreferences } from "../valueobjects/UserPreferences";

export interface UserPrefRepository {
  getUserPrefs(userId: string): UserPreferences | null;
}
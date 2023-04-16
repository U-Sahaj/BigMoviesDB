import { IUserPreference } from "./IUserPreference";

export interface IUserPrefRepository {
  save(review: IUserPreference): void;
  getUserPreferences(userId: string): IUserPreference | undefined
}
import { IUserPrefRepository } from "../interfaces/IUserPrefRepository";
import { UserPreferences } from "../valueobjects/UserPreferences";

export class UserPrefRepository implements IUserPrefRepository {
  private readonly _userPrefs: Map<string, UserPreferences>;

  private static instance: UserPrefRepository;

  private constructor(private readonly userPrefs: UserPreferences[]) {
    this._userPrefs = new Map(userPrefs.map(userPref => [userPref.userId, userPref]));
  }

  static create(userPrefs: UserPreferences[]): UserPrefRepository {
    if (!UserPrefRepository.instance) {
      UserPrefRepository.instance = new UserPrefRepository(userPrefs);
    }
    return UserPrefRepository.instance;
  }

  static getInstance(): UserPrefRepository {
    if (!UserPrefRepository.instance) {
      throw new Error("UserPrefRepository has not been created.");
    }
    return UserPrefRepository.instance;
  }

  public getUserPreferences(userId: string): UserPreferences | undefined {
    return this._userPrefs.get(userId);
  }
}

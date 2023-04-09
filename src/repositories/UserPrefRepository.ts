import { UserPreferences } from "../valueobjects/UserPreferences";

export class UserPrefRepository {
  private readonly _userPrefs: UserPreferences[] = [];

  private static instance: UserPrefRepository;

  private constructor(private readonly userPrefs: UserPreferences[]) {
    this._userPrefs = userPrefs
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
    return this._userPrefs.find((userPrefs) => userPrefs.userId === userId);
  }
}
import { IUserPrefRepository } from "../interfaces/IUserPrefRepository";
import { IUserPreference } from "../interfaces/IUserPreference";
import { UserPreference } from "../valueobjects/UserPreference";

export class UserPrefRepository implements IUserPrefRepository {
  private readonly _userPrefs: Map<string, UserPreference>;

  private static instance: UserPrefRepository;

  private constructor(userPrefs: IUserPreference[]) {
    this._userPrefs = new Map(userPrefs.map(userPref => [userPref.userId, userPref]));
    // console.log(`UserPrefRepository: constructor: `,this._userPrefs)
  }

  static create(userPrefs: UserPreference[]): UserPrefRepository {
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

  public getUserPreferences(userId: string): UserPreference | undefined {
    console.log(`UserPrefRepository: * `, this._userPrefs.size)
    return this._userPrefs.get(userId);
  }
}

import { IUserPrefRepository } from "../interfaces/IUserPrefRepository";
import { IUserPreference } from "../interfaces/IUserPreference";

export class UserPrefRepository implements IUserPrefRepository {
  private readonly userPrefsMap: Map<string, IUserPreference>;

  private static instance: UserPrefRepository;

  private constructor(userPrefs: IUserPreference[]) {
    this.userPrefsMap = new Map(userPrefs.map(userPref => [userPref.userId, userPref]));
    // console.log(`UserPrefRepository: constructor: `,this._userPrefs)
  }

  static create(userPrefs: IUserPreference[]): IUserPrefRepository {
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

  public getUserPreferences(userId: string): IUserPreference | undefined {
    console.log(`UserPrefRepository: ! `, userId.length)
    console.log(`UserPrefRepository: @ `, this.userPrefsMap.get(userId))
    
    return this.userPrefsMap.get(userId);
  }

  save(userPref: IUserPreference): void {
    this.userPrefsMap.set(userPref.userId, userPref);
  }


}

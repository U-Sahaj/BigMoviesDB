export class UserPreferences {
  private readonly _userId: string;
  private readonly _preferredActors: string[];
  private readonly _preferredDirectors: string[];
  private readonly _preferredLanguages: string[];

  constructor(userId: string, preferredActors: string[], preferredDirectors: string[], preferredLanguages: string[]) {
    this._userId = userId;
    this._preferredActors = preferredActors;
    this._preferredDirectors = preferredDirectors;
    this._preferredLanguages = preferredLanguages;
  }
  get preferredActors() {
    return this._preferredActors
  }
  get preferredDirectors() {
    return this._preferredDirectors
  }
  get preferredLanguages() {
    return this._preferredLanguages
  }
  get userId() {
    return this._userId
  }
}





import { IUserPreference } from "../interfaces/IUserPreference";

export class UserPreference implements IUserPreference {
  constructor(
    public readonly userId: string,
    public readonly favouriteActors: string[],
    public readonly favouriteDirectors: string[],
    public readonly preferredLanguages: string[]
  ) {}
}

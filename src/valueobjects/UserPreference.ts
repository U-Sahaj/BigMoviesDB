import { IUserPreference } from "../interfaces/IUserPreference";

export class UserPreference implements IUserPreference {
  constructor(
    public readonly userId: string,
    public readonly favourite_actors: string[],
    public readonly favourite_directors: string[],
    public readonly preferred_languages: string[]
  ) {}
}

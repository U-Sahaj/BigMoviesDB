export interface IUserPreference {
  readonly userId: string;
  readonly favouriteActors: string[];
  readonly favouriteDirectors: string[];
  readonly preferredLanguages: string[];
}
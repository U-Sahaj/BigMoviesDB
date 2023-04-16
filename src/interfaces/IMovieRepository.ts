import { UserPreference } from "../valueobjects/UserPreference";
import { IMovie } from "./IMovie";

export interface IMovieRepository {
  // getMovie(movieId: string): IMovie;
  save(review: IMovie): void;
  getMoviesMatchingUserPreferences(userPrefs: UserPreference, searchText: string): IMovie[];
}
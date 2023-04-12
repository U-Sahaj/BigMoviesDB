import { Movie } from "../valueobjects/Movie";
import { UserPreference } from "../valueobjects/UserPreference";

export interface IMovieRepository {
  getMoviesMatchingUserPreferences(userPrefs: UserPreference, searchText: string): Movie[];
}
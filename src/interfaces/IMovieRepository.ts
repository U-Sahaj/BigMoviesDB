import { Movie } from "../valueobjects/Movie";
import { UserPreferences } from "../valueobjects/UserPreferences";

export interface IMovieRepository {
  getMoviesMatchingUserPreferences(userPrefs: UserPreferences, searchText: string): Movie[];
}
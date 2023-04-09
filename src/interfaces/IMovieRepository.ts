import { Movie } from "../valueobjects/Movie";
import { UserPreferences } from "../valueobjects/UserPreferences";

export interface MovieRepository {
  getAllMovies(): Movie[];
  getMoviesMatchingUserPreferences(userPrefs: UserPreferences, searchText: string): Movie[];
}
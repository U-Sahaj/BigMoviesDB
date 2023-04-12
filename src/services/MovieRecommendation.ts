import { MovieMongoDBRepository } from "../repositories/MovieMongoDBRepository";
import { MovieRepository } from "../repositories/MovieRepository";
import { UserPrefRepository } from "../repositories/UserPrefRepository";
import { Movie } from "../valueobjects/Movie";
import { UserPreference } from "../valueobjects/UserPreference";


export function getMovies(userId: string, searchText: string): string[] {
  const userPrefs: UserPreference | undefined = UserPrefRepository.getInstance().getUserPreferences(userId);
  if (!userPrefs) {
    return [];
  }
  const movies: Movie[] = MovieRepository.getInstance().getMoviesMatchingUserPreferences(userPrefs, searchText);
  const sortedMovies: Movie[] = movies.sort((a: Movie, b: Movie) => a.movieTitle.localeCompare(b.movieTitle));
  return sortedMovies.map((movie: Movie) => movie.movieTitle);
}

export function getMoviesFromDB(userId: string, searchText: string): string[] {
  const userPrefs: UserPreference | undefined = UserPrefRepository.getInstance().getUserPreferences(userId);
  if (!userPrefs) {
    return [];
  }
  const movies: Movie[] = MovieMongoDBRepository.getInstance().getMoviesMatchingUserPreferences(userPrefs, searchText);
  const sortedMovies: Movie[] = movies.sort((a: Movie, b: Movie) => a.movieTitle.localeCompare(b.movieTitle));
  return sortedMovies.map((movie: Movie) => movie.movieTitle);
}

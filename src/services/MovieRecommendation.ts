import { MovieRepository } from "../repositories/MovieRepository";
import { UserPrefRepository } from "../repositories/UserPrefRepository";
import { Movie } from "../valueobjects/Movie";
import { UserPreferences } from "../valueobjects/UserPreferences";


export function getMovies(userId: string, searchText: string): string[] {
  const userPrefs: UserPreferences | undefined = UserPrefRepository.getInstance().getUserPreferences(userId);
  if (!userPrefs) {
    return [];
  }
  console.log(`getMovies: `,userPrefs)
  const movies: Movie[] = MovieRepository.getInstance().getMoviesMatchingUserPreferences(userPrefs, searchText);
  const sortedMovies: Movie[] = movies.sort((a: Movie, b: Movie) => a.title.localeCompare(b.title));
  console.log(`getMovies: `,sortedMovies)
  return sortedMovies.map((movie: Movie) => movie.title);

}
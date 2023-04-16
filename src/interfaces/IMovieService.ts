import { IMovie } from "./IMovie";

interface IMovieService {
  searchMovies(userId: string, searchText: string): IMovie[];
  addMovie(movie: IMovie): void;
  updateMovie(movie: IMovie): void;
  deleteMovie(movieId: string): void;
}



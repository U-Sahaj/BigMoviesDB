import { Movie } from "../valueobjects/Movie";
import { UserPreferences } from "../valueobjects/UserPreferences";

export class MovieRepository {
  private readonly _movies: Movie[];

  private static instance: MovieRepository;

  private constructor(private readonly movies: Movie[]) {
    this._movies = movies;
  }

  static create(movies: Movie[]): MovieRepository {
    if (!MovieRepository.instance) {
      MovieRepository.instance = new MovieRepository(movies);
    }
    return MovieRepository.instance;
  }

  static getInstance(): MovieRepository {
    if (!MovieRepository.instance) {
      throw new Error("MovieRepository has not been created.");
    }
    return MovieRepository.instance;
  }

  public getMoviesMatchingUserPreferences(userPrefs: UserPreferences, searchText: string): Movie[] {
    const preferredActors = userPrefs.preferredActors;
    const preferredDirectors = userPrefs.preferredDirectors;
    const preferredLanguages = userPrefs.preferredLanguages;

    const searchTerms = searchText.toLowerCase().split(',');
    // console.log(`getMoviesMatching...: searchTerms `,searchTerms)

    return this._movies.filter((movie) => {
      // Check if the movie matches the user's language preferences
      if (!preferredLanguages.includes(movie.originalLanguage)) {
        return false;
      }
      // console.log(`getMoviesMatching...: after language`,movie)

      // Check if the movie matches the user's actor or director preferences
      const hasPreferredActor = movie.cast.some((actor) => preferredActors.includes(actor));
      const hasPreferredDirector = movie.directors.some((director) => preferredDirectors.includes(director));
      if (!hasPreferredActor && !hasPreferredDirector) {
        return false;
      }
      // console.log(`getMoviesMatching...: after preferences`,movie)

      // Check if the movie matches the search terms
      for (const term of searchTerms) {
        if (!movie.title.toLowerCase().includes(term)
            && !movie.cast.some((actor) => actor.toLowerCase().includes(term))
            && !movie.directors.some((director) => director.toLowerCase().includes(term))) {
          return false;
        }
      }
      // console.log(`getMoviesMatching...: after final check`,movie)

      return true;
    });
  }
}

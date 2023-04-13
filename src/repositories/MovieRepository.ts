import { IMovieRepository } from "../interfaces/IMovieRepository";
import { Movie } from "../valueobjects/Movie";
import { UserPreference } from "../valueobjects/UserPreference";
import  ISO6391  from 'iso-639-1';

export class MovieRepository implements IMovieRepository {
  private readonly _movies: Map<string, Movie>;

  private static instance: MovieRepository;

  private constructor(private readonly movies: Movie[]) {
    this._movies = new Map(movies.map(movie => [movie.id, movie]));
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

  public getMoviesMatchingUserPreferences(userPrefs: UserPreference, searchText: string): Movie[] {
    const preferredActors = userPrefs.favourite_actors;
    const preferredDirectors = userPrefs.favourite_directors;
    const preferredLanguages = userPrefs.preferred_languages;
    console.log(`MovieRepository: # `,preferredActors,preferredDirectors,preferredLanguages)

    const searchTerms = searchText.toLowerCase().split(',');
    // console.log(`getMoviesMatching...: searchTerms `,searchTerms)
    console.log(`MovieRepository: @ `,this._movies.size)
    // console.log(`MovieRepository: ^ `,this._movies.get('1')!)


    return Array.from(this._movies.values()).filter((movie) => {
      // Check if the movie matches the user's language preferences
      if (!preferredLanguages.includes(ISO6391.getName(movie.originalLanguage))) {
        return false;
      }
      // console.log(`MovieRepository: # `,movie.movieTitle)

      // Check if the movie matches the user's actor or director preferences
      const hasPreferredActor = movie.actors.some((actor) => preferredActors.includes(actor));
      const hasPreferredDirector = movie.directors.some((director) => preferredDirectors.includes(director));
      if (!hasPreferredActor && !hasPreferredDirector) {
        return false;
      }
      // console.log(`MovieRepository: $ `,searchTerms)

      // Check if the movie matches the search terms
      for (const term of searchTerms) {
        if (!movie.movieTitle.toLowerCase().includes(term)
            && !movie.actors.some((actor) => actor.toLowerCase().includes(term))
            && !movie.directors.some((director) => director.toLowerCase().includes(term))) {
          return false;
        }
      }
  
      return true;
    });
  
  }
}

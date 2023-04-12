import { describe, it, beforeEach, afterEach, expect, beforeAll, afterAll } from 'vitest'
import { Movie } from '../valueobjects/Movie';
import { MovieRepository } from './MovieRepository';
import { IUserPreference } from '../interfaces/IUserPreference';


describe.skip("MovieRepository", () => {
  let movieRepository: MovieRepository;

  beforeEach(() => {
    const movie1 = new Movie("1", "The Godfather", "en", ["Marlon Brando", "Al Pacino"], ["Francis Ford Coppola"]);
    const movie2 = new Movie("2", "The Shawshank Redemption", "en", ["Tim Robbins", "Morgan Freeman"], ["Frank Darabont"]);
    const movie3 = new Movie("3", "The Dark Knight", "en", ["Christian Bale", "Heath Ledger"], ["Christopher Nolan"]);
    const movie4 = new Movie("4", "The Godfather: Part II", "en", ["Al Pacino", "Robert De Niro"], ["Francis Ford Coppola"]);
    const movie5 = new Movie("5", "Inception", "en", ["Leonardo DiCaprio", "Ellen Page"], ["Christopher Nolan"]);
    const movie6 = new Movie("6", "The Matrix", "en", ["Keanu Reeves", "Carrie-Anne Moss"], ["Lana Wachowski", "Lilly Wachowski"]);
    const movies = [movie1, movie2, movie3, movie4, movie5, movie6];

    movieRepository = MovieRepository.create(movies);
  });

  it("should return only movies that match the user preference", () => {
    const userPreference: IUserPreference = {
      userId: "1",
      favourite_actors: ["Robert De Niro"],
      favourite_directors: ["Francis Ford Coppola"],
      preferred_languages: ["English"],
    };

    const result = movieRepository.getMoviesMatchingUserPreferences(userPreference, "");
      
    expect(result.length).toBe(2);
    expect(result[0].id).toBe("1");
    expect(result[1].id).toBe("4");

  });

  describe.skip("getMoviesMatchingUserPreferences with search text", () => {
    it("should return only movies that match the user preference and contain the search text", () => {
      const userPref: IUserPreference = {
        userId: "user1",
        favourite_actors: ["Al Pacino"],
        favourite_directors: ["Francis Ford Coppola"],
        preferred_languages: ["English"],
      };

      const searchText = "Godfather";
      const expectedMovies = [
        new Movie("1", "The Godfather", "en", ["Marlon Brando", "Al Pacino"], ["Francis Ford Coppola"]),
        new Movie("4", "The Godfather: Part II", "en", ["Al Pacino", "Robert De Niro"], ["Francis Ford Coppola"]),
      ];

      const actualMovies = movieRepository.getMoviesMatchingUserPreferences(userPref, searchText);

      expect(actualMovies).toEqual(expectedMovies);
    });
  });

});

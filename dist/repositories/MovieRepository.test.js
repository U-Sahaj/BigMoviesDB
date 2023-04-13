"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const Movie_1 = require("../valueobjects/Movie");
const MovieRepository_1 = require("./MovieRepository");
vitest_1.describe.skip("MovieRepository", () => {
    let movieRepository;
    (0, vitest_1.beforeEach)(() => {
        const movie1 = new Movie_1.Movie("1", "The Godfather", "en", ["Marlon Brando", "Al Pacino"], ["Francis Ford Coppola"]);
        const movie2 = new Movie_1.Movie("2", "The Shawshank Redemption", "en", ["Tim Robbins", "Morgan Freeman"], ["Frank Darabont"]);
        const movie3 = new Movie_1.Movie("3", "The Dark Knight", "en", ["Christian Bale", "Heath Ledger"], ["Christopher Nolan"]);
        const movie4 = new Movie_1.Movie("4", "The Godfather: Part II", "en", ["Al Pacino", "Robert De Niro"], ["Francis Ford Coppola"]);
        const movie5 = new Movie_1.Movie("5", "Inception", "en", ["Leonardo DiCaprio", "Ellen Page"], ["Christopher Nolan"]);
        const movie6 = new Movie_1.Movie("6", "The Matrix", "en", ["Keanu Reeves", "Carrie-Anne Moss"], ["Lana Wachowski", "Lilly Wachowski"]);
        const movies = [movie1, movie2, movie3, movie4, movie5, movie6];
        movieRepository = MovieRepository_1.MovieRepository.create(movies);
    });
    (0, vitest_1.it)("should return only movies that match the user preference", () => {
        const userPreference = {
            userId: "1",
            favourite_actors: ["Robert De Niro"],
            favourite_directors: ["Francis Ford Coppola"],
            preferred_languages: ["English"],
        };
        const result = movieRepository.getMoviesMatchingUserPreferences(userPreference, "");
        (0, vitest_1.expect)(result.length).toBe(2);
        (0, vitest_1.expect)(result[0].id).toBe("1");
        (0, vitest_1.expect)(result[1].id).toBe("4");
    });
    vitest_1.describe.skip("getMoviesMatchingUserPreferences with search text", () => {
        (0, vitest_1.it)("should return only movies that match the user preference and contain the search text", () => {
            const userPref = {
                userId: "user1",
                favourite_actors: ["Al Pacino"],
                favourite_directors: ["Francis Ford Coppola"],
                preferred_languages: ["English"],
            };
            const searchText = "Godfather";
            const expectedMovies = [
                new Movie_1.Movie("1", "The Godfather", "en", ["Marlon Brando", "Al Pacino"], ["Francis Ford Coppola"]),
                new Movie_1.Movie("4", "The Godfather: Part II", "en", ["Al Pacino", "Robert De Niro"], ["Francis Ford Coppola"]),
            ];
            const actualMovies = movieRepository.getMoviesMatchingUserPreferences(userPref, searchText);
            (0, vitest_1.expect)(actualMovies).toEqual(expectedMovies);
        });
    });
});

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const MovieRepository_1 = require("../repositories/MovieRepository");
const UserPrefRepository_1 = require("../repositories/UserPrefRepository");
const MovieRecommendation_1 = require("./MovieRecommendation");
const UserPreference_1 = require("../valueobjects/UserPreference");
const Movie_1 = require("../valueobjects/Movie");
const MovieMongoDBRepository_1 = require("../repositories/MovieMongoDBRepository");
(0, vitest_1.describe)('MovieService', () => {
    vitest_1.describe.skip('getMovies using in-memory repositories', () => {
        let userPrefs;
        let movies;
        (0, vitest_1.beforeAll)(() => {
            userPrefs = new UserPreference_1.UserPreference("user123", ['Tom Hanks'], ['Steven Spielberg'], ['English']);
            movies = [
                new Movie_1.Movie('1', 'Saving Private Ryan', 'en', ['Tom Hanks', 'Matt Damon'], ['Steven Spielberg']),
                new Movie_1.Movie('2', 'The Terminal', 'en', ['Tom Hanks', 'Catherine Zeta-Jones'], ['Steven Spielberg']),
                new Movie_1.Movie('3', 'Catch Me If You Can', 'en', ['Leonardo DiCaprio', 'Tom Hanks'], ['Steven Spielberg']),
                new Movie_1.Movie('4', 'The Dark Knight', 'en', ['Christian Bale', 'Heath Ledger'], ['Christopher Nolan']),
                new Movie_1.Movie('5', 'Inception', 'en', ['Leonardo DiCaprio'], ['Christopher Nolan']),
            ];
            UserPrefRepository_1.UserPrefRepository.create([userPrefs]);
            MovieRepository_1.MovieRepository.create(movies);
        });
        (0, vitest_1.it)('should return an array of movies sorted by user preferences and search term, then alphabetically', () => {
            const result = (0, MovieRecommendation_1.getMovies)('user123', 'Tom');
            (0, vitest_1.expect)(result).toEqual(['Catch Me If You Can', 'Saving Private Ryan', 'The Terminal']);
        });
    });
    (0, vitest_1.describe)('getMovies using MongoDB backed movie repository', () => {
        let userPrefRepo;
        let movieRepo;
        (0, vitest_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
            const userPrefsData = `[
        {
          "100": {
            "preferred_languages": [
              "English",
              "Spanish"
            ],
            "favourite_actors": [
              "Denzel Washington",
              "Kate Winslet",
              "Emma Suárez",
              "Tom Hanks"
            ],
            "favourite_directors": [
              "Steven Spielberg",
              "Martin Scorsese",
              "Pedro Almodóvar"
            ]
          }
        },
        {
          "101": {
            "preferred_languages": [
              "English"
            ],
            "favourite_actors": [
              "Denzel Washington",
              "Anne Hathaway",
              "Tom Hanks"
            ],
            "favourite_directors": [
              "Guy Ritchie",
              "Quentin Tarantino"
            ]
          }
        },
        {
          "102": {
            "preferred_languages": [
              "English"
            ],
            "favourite_actors": [
              "Uma Thurman",
              "Charlize Theron",
              "John Travolta"
            ],
            "favourite_directors": [
              "Quentin Tarantino"
            ]
          }
        },
        {
          "103": {
            "preferred_languages": [
              "English"
            ],
            "favourite_actors": [
              "Antonio Banderas",
              "Clint Eastwood",
              "Bruce Willis"
            ],
            "favourite_directors": [
              "Stanley Kubrick",
              "Oliver Stone"
            ]
          }
        },
        {
          "104": {
            "preferred_languages": [
              "English"
            ],
            "favourite_actors": [
              "Anthony Hopkins",
              "Adam Sandler",
              "Bruce Willis"
            ],
            "favourite_directors": [
              "Nora Ephron",
              "Oliver Stone"
            ]
          }
        },
        {
          "105": {
            "preferred_languages": [
              "Spanish"
            ],
            "favourite_actors": [
              "Anthony Hopkins",
              "Bárbara Goenaga",
              "Tenoch Huerta"
            ],
            "favourite_directors": [
              "Amat Escalante",
              "Robert Rodriguez"
            ]
          }
        },
        {
          "106": {
            "preferred_languages": [
              "English",
              "Spanish"
            ],
            "favourite_actors": [
              "Brad Pitt",
              "Robert Downey Jr.",
              "Jennifer Lawrence",
              "Johnny Depp"
            ],
            "favourite_directors": [
              "Steven Spielberg",
              "Martin Scorsese",
              "Ridley Scott"
            ]
          }
        }
      ]`;
            const userPreferences = JSON.parse(userPrefsData).map((user) => {
                const userId = Object.keys(user)[0];
                const preferences = user[userId];
                return {
                    userId,
                    preferred_languages: preferences.preferred_languages,
                    favourite_actors: preferences.favourite_actors,
                    favourite_directors: preferences.favourite_directors,
                };
            });
            userPrefRepo = UserPrefRepository_1.UserPrefRepository.create(userPreferences);
            movieRepo = yield MovieMongoDBRepository_1.MovieMongoDBRepository.create("test-mongo:27017", "BigMoviesDB", "");
        }));
        (0, vitest_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        }));
        (0, vitest_1.it)('should return the user preferences for a valid user ID', () => {
            const defaultUserPref = {
                userId: '100',
                favourite_actors: ['Al Pacino'],
                favourite_directors: ['Sam Mendes'],
                preferred_languages: ['English']
            };
            const userId = '100';
            const userPref = userPrefRepo.getUserPreferences(userId);
            const searchText = '';
            const foundMovies = movieRepo.getMoviesMatchingUserPreferences(userPref !== null && userPref !== void 0 ? userPref : defaultUserPref, searchText);
            console.log(`MovieRecommendation.test: * `, foundMovies.length);
            console.log(`MovieRecommendation.test: * `, foundMovies[0].movieTitle);
            (0, vitest_1.expect)(foundMovies[0].movieTitle).toEqual('Titanic');
        });
        (0, vitest_1.it)('should return an array of movies sorted by user preferences and search term, then alphabetically', () => {
            const result = (0, MovieRecommendation_1.getMoviesFromDB)('100', 'Tom Hanks');
            (0, vitest_1.expect)(result[0]).toEqual('A League of Their Own');
        });
    });
});

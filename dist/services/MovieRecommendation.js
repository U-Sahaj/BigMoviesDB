"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMoviesFromDB = exports.getMovies = void 0;
const MovieMongoDBRepository_1 = require("../repositories/MovieMongoDBRepository");
const MovieRepository_1 = require("../repositories/MovieRepository");
const UserPrefRepository_1 = require("../repositories/UserPrefRepository");
function getMovies(userId, searchText) {
    const userPrefs = UserPrefRepository_1.UserPrefRepository.getInstance().getUserPreferences(userId);
    if (!userPrefs) {
        return [];
    }
    const movies = MovieRepository_1.MovieRepository.getInstance().getMoviesMatchingUserPreferences(userPrefs, searchText);
    const sortedMovies = movies.sort((a, b) => a.movieTitle.localeCompare(b.movieTitle));
    return sortedMovies.map((movie) => movie.movieTitle);
}
exports.getMovies = getMovies;
function getMoviesFromDB(userId, searchText) {
    const userPrefs = UserPrefRepository_1.UserPrefRepository.getInstance().getUserPreferences(userId);
    if (!userPrefs) {
        return [];
    }
    const movies = MovieMongoDBRepository_1.MovieMongoDBRepository.getInstance().getMoviesMatchingUserPreferences(userPrefs, searchText);
    const sortedMovies = movies.sort((a, b) => a.movieTitle.localeCompare(b.movieTitle));
    return sortedMovies.map((movie) => movie.movieTitle);
}
exports.getMoviesFromDB = getMoviesFromDB;

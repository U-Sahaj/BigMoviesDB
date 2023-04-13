"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
class Movie {
    constructor(id, movieTitle, originalLanguage, actors, directors) {
        this.id = id;
        this.movieTitle = movieTitle;
        this.originalLanguage = originalLanguage;
        this.actors = actors;
        this.directors = directors;
    }
}
exports.Movie = Movie;

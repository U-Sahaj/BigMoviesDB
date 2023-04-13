"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieModel = void 0;
const mongoose_1 = require("mongoose");
const Movie_schema_1 = require("./Movie.schema");
exports.MovieModel = (0, mongoose_1.model)('Movie', Movie_schema_1.movieSchema);

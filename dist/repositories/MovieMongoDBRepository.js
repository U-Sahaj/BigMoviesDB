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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieMongoDBRepository = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Movie_1 = require("../valueobjects/Movie");
const MovieRepository_1 = require("./MovieRepository");
const MovieCredits_schema_1 = require("../mongoose/MovieCredits.schema");
const MovieDetails_schema_1 = require("../mongoose/MovieDetails.schema");
class MovieMongoDBRepository {
    constructor(movies) {
        MovieMongoDBRepository._movieRepository = MovieRepository_1.MovieRepository.create(movies);
    }
    static create(uri, dbName, colName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (MovieMongoDBRepository._instance) {
                return MovieMongoDBRepository._instance;
            }
            yield mongoose_1.default.connect(`mongodb://${uri}/${dbName}`);
            const movieCreditsModel = mongoose_1.default.model('MovieCredits', MovieCredits_schema_1.MovieCreditsSchema, 'MovieCredits');
            const movieDetailsModel = mongoose_1.default.model('MovieDetails', MovieDetails_schema_1.MovieDetailsSchema, 'MovieDetails');
            const movieCreditsDocs = yield movieCreditsModel.find().lean();
            const movieDetailsDocs = yield movieDetailsModel.find().lean();
            const movies = movieDetailsDocs.map((details) => {
                var _a, _b;
                const credits = movieCreditsDocs.find((credits) => credits.movie_id === details.id);
                return new Movie_1.Movie(details.id, details.title, details.original_language, (_a = credits === null || credits === void 0 ? void 0 : credits.cast.map((cast) => cast.name)) !== null && _a !== void 0 ? _a : [], (_b = credits === null || credits === void 0 ? void 0 : credits.crew.filter((crew) => crew.job === 'Director').map((crew) => crew.name)) !== null && _b !== void 0 ? _b : []);
            });
            yield mongoose_1.default.disconnect();
            MovieMongoDBRepository._instance = new MovieMongoDBRepository(movies);
            return MovieMongoDBRepository._instance;
        });
    }
    static getInstance() {
        if (!MovieMongoDBRepository._instance) {
            throw new Error("UserPrefMongoDBRepository has not been initialized yet");
        }
        return MovieMongoDBRepository._instance;
    }
    getMoviesMatchingUserPreferences(userPrefs, searchText) {
        console.log(`MovieMongoDBRepository: @ `, userPrefs);
        console.log(`MovieMongoDBRepository: * `, searchText);
        return MovieMongoDBRepository._movieRepository.getMoviesMatchingUserPreferences(userPrefs, searchText);
    }
}
exports.MovieMongoDBRepository = MovieMongoDBRepository;

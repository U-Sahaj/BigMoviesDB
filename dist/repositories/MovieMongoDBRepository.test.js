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
const vitest_1 = require("vitest");
const MovieMongoDBRepository_1 = require("./MovieMongoDBRepository");
const Movie_1 = require("../valueobjects/Movie");
const mongoose_1 = __importDefault(require("mongoose"));
const MovieCredits_schema_1 = require("../mongoose/MovieCredits.schema");
vitest_1.describe.skip('MovieMongoDBRepository', () => {
    let movieRepo;
    (0, vitest_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        movieRepo = yield MovieMongoDBRepository_1.MovieMongoDBRepository.create("test-mongo:27017", "BigMoviesDB", "MovieCredits");
    }));
    (0, vitest_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
    }));
    (0, vitest_1.it)('should return movies matching user preference and search text', () => {
        const userPref = {
            userId: '100',
            favourite_actors: ['Al Pacino'],
            favourite_directors: ['Sam Mendes'],
            preferred_languages: ['English']
        };
        const searchText = 'Sam Mendes'; //'Godfather';
        const expectedMovies = [
            new Movie_1.Movie('1', 'The Godfather', 'English', ['Marlon Brando', 'Al Pacino'], ['Francis Ford Coppola']),
            new Movie_1.Movie('4', 'The Godfather: Part II', 'English', ['Al Pacino', 'Robert De Niro'], ['Francis Ford Coppola'])
        ];
        const actualMovies = movieRepo.getMoviesMatchingUserPreferences(userPref, searchText);
        console.log(`MovieMongoDBRepository.test: * `, actualMovies.length);
        (0, vitest_1.expect)(actualMovies[0].movieTitle).toEqual('Spectre');
    });
});
vitest_1.describe.skip('MovieMongoDBRepository -> MoviesCredits collection', () => {
    let movieRepo;
    (0, vitest_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connect(`mongodb://test-mongo:27017/TestingDB`);
    }));
    (0, vitest_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
    }));
    //   console.log(`MovieMongoDBRepository.test: ^ `, )
    vitest_1.it.skip('should insert and retrieve movie credits document', () => __awaiter(void 0, void 0, void 0, function* () {
        const movieCreditsData = {
            movie_id: '1234',
            title: 'The Matrix',
            cast: [
                { cast_id: 1, name: 'Keanu Reeves' },
                { cast_id: 2, name: 'Carrie-Anne Moss' },
            ],
            crew: [
                { id: 1, job: 'Director', name: 'Lana Wachowski' },
                { id: 2, job: 'Director', name: 'Lilly Wachowski' },
            ],
        };
        const movieCreditsModel = mongoose_1.default.model('MovieCredits', MovieCredits_schema_1.MovieCreditsSchema);
        // Insert the document
        const movieCredits = yield movieCreditsModel.create(movieCreditsData);
        console.log(`MovieMongoDBRepository.test: * `, movieCredits);
        // Retrieve the document and check its contents
        const retrievedMovieCredits = yield movieCreditsModel.findOne({ movie_id: '1234' }).lean();
        console.log(`MovieMongoDBRepository.test: # `, retrievedMovieCredits);
        // map the retrieved documents to plain objects
        if (Array.isArray(retrievedMovieCredits)) {
            const mappedCredits = retrievedMovieCredits.map((doc) => {
                return {
                    cast_id: doc.cast_id,
                    name: doc.name,
                    job: doc.job,
                    id: doc.id,
                };
            });
            // assert that the mapped credits are deep equal to the original data
            (0, vitest_1.expect)(mappedCredits).to.deep.equal(movieCreditsData);
        }
    }));
    (0, vitest_1.it)('should find one movie from BigMoviesDB', () => __awaiter(void 0, void 0, void 0, function* () {
        const movieCreditsModel = mongoose_1.default.model('MovieCredits', MovieCredits_schema_1.MovieCreditsSchema, 'MovieCredits');
        const retrievedMovieCredits = yield movieCreditsModel.findOne({ movie_id: '1930' }).lean();
        console.log(`MovieMongoDBRepository.test: @ `, retrievedMovieCredits);
    }));
});

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
const mongoose_1 = __importDefault(require("mongoose"));
const MovieCredits_schema_1 = require("../mongoose/MovieCredits.schema");
vitest_1.describe.skip('MovieMongoDBRepository -> MovieCredits collection', () => {
    (0, vitest_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connect(`mongodb://test-mongo:27017/BigMoviesDB`);
    }));
    (0, vitest_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
    }));
    (0, vitest_1.it)('should find one movie from BigMoviesDB', () => __awaiter(void 0, void 0, void 0, function* () {
        const movieCreditsModel = mongoose_1.default.model('MovieCredit', MovieCredits_schema_1.MovieCreditsSchema, 'MovieCredits');
        // const retrievedMovieCredits = await movieCreditsModel.findOne({ movie_id: '1930' }).lean();
        try {
            const result = yield movieCreditsModel.findOne({ movie_id: '1930' });
            console.log(`MMRepository.test: @ `, result);
        }
        catch (error) {
            console.error(`MMRepository.test: # `, error.message);
        }
    }));
});

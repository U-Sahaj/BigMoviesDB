"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieCreditsSchema = void 0;
const mongoose_1 = require("mongoose");
const CastSchema = new mongoose_1.Schema({
    cast_id: Number,
    name: String
});
const CrewSchema = new mongoose_1.Schema({
    id: Number,
    job: String,
    name: String
});
exports.MovieCreditsSchema = new mongoose_1.Schema({
    movie_id: {
        type: String,
        required: true,
        unique: true
    },
    title: String,
    cast: [CastSchema],
    crew: [CrewSchema]
});
// const MovieCreditsModel: Model<MovieCreditsDocument> = model<MovieCreditsDocument>("MovieCredits", MovieCreditsSchema);

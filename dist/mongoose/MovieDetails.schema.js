"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieDetailsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.MovieDetailsSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    original_language: String
});
// const MovieDetails = model('MovieDetails', MovieDetailsSchema);

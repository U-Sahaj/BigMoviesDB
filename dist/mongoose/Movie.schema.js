"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieSchema = void 0;
const mongoose_1 = require("mongoose");
;
exports.movieSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    originalLanguage: { type: String, required: true },
    actors: [{ type: String }],
    directors: [{ type: String }]
});

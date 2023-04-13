"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MovieRecommendation_1 = require("../services/MovieRecommendation");
const MovieRecommendationRouter = (0, express_1.Router)({ strict: false });
MovieRecommendationRouter.get('/movies/user/:userId/search', (req, res) => {
    const { userId } = req.params;
    const { text = ' ' } = req.query;
    const movieTitles = (0, MovieRecommendation_1.getMoviesFromDB)(userId, text); // call your function to get movie titles
    res.json(movieTitles); // send the movie titles as a JSON response
});
exports.default = MovieRecommendationRouter;

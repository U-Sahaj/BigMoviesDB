import { Router } from "express"
import { getMoviesFromDB } from "../services/MovieRecommendation"

 
const MovieRecommendationRouter: Router = Router({strict:false})

MovieRecommendationRouter.get('/movies/user/:userId/search', (req, res) => {
  const { userId } = req.params;
  const { text = ' '} = req.query;

  const movieTitles = getMoviesFromDB(userId, text as string); // call your function to get movie titles

  res.json(movieTitles); // send the movie titles as a JSON response
});

export default MovieRecommendationRouter

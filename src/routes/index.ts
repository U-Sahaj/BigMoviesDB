import { Router } from "express"
import { getMoviesFromDB } from "../services/MovieRecommendation"

 
const MovieRecommendationRouter: Router = Router({strict:false})

MovieRecommendationRouter.get('/movies/user/:userId/search', (req, res) => {
  const { userId } = req.params;
  const { text = ' ' } = req.query;

  console.log(`MovieRecommendationRouter: ${text}`)

  const movieTitles = getMoviesFromDB(userId, text as string);

  res.json(movieTitles); // send the movie titles as a JSON response
});

export default MovieRecommendationRouter

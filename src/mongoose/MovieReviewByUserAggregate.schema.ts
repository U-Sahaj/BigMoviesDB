import { Schema } from "mongoose";
import { IMovieReviewByUserAggregate } from "../interfaces/IMovieReviewByUserAggregate";
import { movieReviewSchema } from "./MovieReview.schema";
import { similarityScoreSchema } from "./SimilarityScore.schema";
import { IUser } from "../interfaces/IUser";
import { IMovieReview } from "../interfaces/IMovieReview";
import { ISimilarityScore } from "../interfaces/ISimilarityScore";

export interface IMovieReviewByUserAggregateDocument extends Document {
  user: IUser;
  movieReviews: IMovieReview[];
  similarityScores: ISimilarityScore[];
}

export const movieReviewByUserAggregateSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  movieReviews: {
    type: [movieReviewSchema],
    default: [],
  },
  similarityScores: {
    type: [similarityScoreSchema],
    default: [],
  },
});
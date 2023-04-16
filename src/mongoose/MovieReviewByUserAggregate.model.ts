import { model } from "mongoose";
import { IMovieReviewByUserAggregateDocument, movieReviewByUserAggregateSchema } from "./MovieReviewByUserAggregate.schema";

const MovieReviewByUserAggregateModel = model<IMovieReviewByUserAggregateDocument>(
  'MovieReviewByUserAggregate',
  movieReviewByUserAggregateSchema
);
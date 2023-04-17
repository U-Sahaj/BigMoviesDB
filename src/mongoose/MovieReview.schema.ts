import { Schema, model } from "mongoose";
import { IMovieReview } from "../interfaces/IMovieReview";

export const movieReviewSchema = new Schema<IMovieReview>({
  movieId: { type: String, required: true },
  userId: { type: String, required: true },
  reviewText: { type: String, required: true },
  rating: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
});
export interface MovieReviewDocument extends IMovieReview, Document {};

export const MovieReviewModel = model<MovieReviewDocument>('MovieReview', movieReviewSchema);

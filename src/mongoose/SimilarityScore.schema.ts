import { Schema } from "mongoose";
import { ISimilarityScore } from "../interfaces/ISimilarityScore";

export const similarityScoreSchema = new Schema<ISimilarityScore>({
  movieId: { type: String, required: true },
  userId: { type: String, required: true },
  score: { type: Number, required: true },
});
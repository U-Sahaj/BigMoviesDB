import { model } from "mongoose";
import { MovieDocument, movieSchema } from "./Movie.schema";

export const MovieModel = model<MovieDocument>('Movie', movieSchema);

import { Schema, model } from "mongoose";
import { IMovie } from "../interfaces/IMovie";

export interface MovieDocument extends IMovie, Document {};

export const movieSchema = new Schema<MovieDocument>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  originalLanguage: { type: String, required: true },
  actors: [{ type: String }],
  directors: [{ type: String }]
});




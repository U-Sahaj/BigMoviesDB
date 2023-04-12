import { Model, Schema, model } from "mongoose";

export interface ICast {
  cast_id: number;
  name: string;
}

export interface ICrew {
  id: number;
  job: string;
  name: string;
}

interface MovieCredits {
  movie_id: string;
  title: string;
  cast: ICast[];
  crew: ICrew[];
}

const CastSchema = new Schema({
  cast_id: Number,
  name: String
});

const CrewSchema = new Schema({
  id: Number,
  job: String,
  name: String
});

export const MovieCreditsSchema = new Schema({
  movie_id: {
    type: String,
    required: true,
    unique: true
  },
  title: String,
  cast: [CastSchema],
  crew: [CrewSchema]
});

export interface MovieCreditsDocument extends MovieCredits, Document {}

// const MovieCreditsModel: Model<MovieCreditsDocument> = model<MovieCreditsDocument>("MovieCredits", MovieCreditsSchema);






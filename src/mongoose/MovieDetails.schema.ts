import { Schema, model } from "mongoose";

interface MovieDetails {
  id: string;
  original_language: string;
}

export const MovieDetailsSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  original_language: String
});

export interface MovieDetailsDocument extends MovieDetails, Document {}

// const MovieDetails = model('MovieDetails', MovieDetailsSchema);

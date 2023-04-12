import mongoose, { Model } from "mongoose";
import { Movie } from "../valueobjects/Movie";
import { MovieRepository } from "./MovieRepository";
import { MovieDocument, movieSchema } from "../mongoose/Movie.schema";
import { UserPreference } from "../valueobjects/UserPreference";
import { IMovieRepository } from "../interfaces/IMovieRepository";
import { MovieCreditsDocument, MovieCreditsSchema } from "../mongoose/MovieCredits.schema";
import { MovieDetailsDocument, MovieDetailsSchema } from "../mongoose/MovieDetails.schema";
import { Cast } from "../valueobjects/Cast";

export class MovieMongoDBRepository implements IMovieRepository{
  private static _instance: MovieMongoDBRepository;
  private static _movieRepository: MovieRepository;

  private constructor(movies: Movie[]) {
    MovieMongoDBRepository._movieRepository = MovieRepository.create(movies);
  }

static async create(uri: string, dbName: string, colName: string): Promise<MovieMongoDBRepository> {
  if (MovieMongoDBRepository._instance) {
    return MovieMongoDBRepository._instance;
  }

  await mongoose.connect(`mongodb://${uri}/${dbName}`);

  const movieCreditsModel: Model<MovieCreditsDocument> = mongoose.model<MovieCreditsDocument>('MovieCredits', MovieCreditsSchema, 'MovieCredits');
  const movieDetailsModel: Model<MovieDetailsDocument> = mongoose.model<MovieDetailsDocument>('MovieDetails', MovieDetailsSchema, 'MovieDetails');

  const movieCreditsDocs: MovieCreditsDocument[] = await movieCreditsModel.find().lean();
  const movieDetailsDocs: MovieDetailsDocument[] = await movieDetailsModel.find().lean();

  const movies: Movie[] = movieDetailsDocs.map((details) => {
    const credits = movieCreditsDocs.find((credits) => credits.movie_id === details.id);
    return new Movie(
      details.id,
      details.title,
      details.original_language,
      credits?.cast.map((cast) => cast.name) ?? [],
      credits?.crew.filter((crew) => crew.job === 'Director').map((crew) => crew.name) ?? []
    );
  });

  await mongoose.disconnect();
  MovieMongoDBRepository._instance = new MovieMongoDBRepository(movies);
  return MovieMongoDBRepository._instance;
}

  static getInstance(): MovieMongoDBRepository {
    if (!MovieMongoDBRepository._instance) {
      throw new Error("UserPrefMongoDBRepository has not been initialized yet");
    }
    return MovieMongoDBRepository._instance;
  }

  public getMoviesMatchingUserPreferences(userPrefs: UserPreference, searchText: string): Movie[] {
    console.log(`MovieMongoDBRepository: @ `,userPrefs)
    console.log(`MovieMongoDBRepository: * `,searchText)

    return MovieMongoDBRepository._movieRepository.getMoviesMatchingUserPreferences(userPrefs,searchText)
  }

}
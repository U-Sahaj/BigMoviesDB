import { ISimilarityScore } from "./ISimilarityScore";

export interface ISimilarityScoreRepository {
  save(score: ISimilarityScore): Promise<void>;
  get(userId: string, movieId: string): Promise<number | undefined>;

  // update(review: IMovieReview): Promise<IMovieReview | null>;
  // deleteByUser(userId: string): Promise<boolean>;
  // deleteByMovie(movieId: string): Promise<boolean>;
  // findByUser(userId: string): Promise<IMovieReview[]>;
  // findByMovie(movieId: string): Promise<IMovieReview[]>;
}

import { IMovieReview } from "./IMovieReview";

export interface IMovieReviewRepository {
  save(review: IMovieReview): void;
  get(userId: string, movieId: string): IMovieReview | undefined;

  // update(review: IMovieReview): Promise<IMovieReview | null>;
  // deleteByUser(userId: string): Promise<boolean>;
  // deleteByMovie(movieId: string): Promise<boolean>;
  // findByUser(userId: string): Promise<IMovieReview[]>;
  // findByMovie(movieId: string): Promise<IMovieReview[]>;
}


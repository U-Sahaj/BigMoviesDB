import { IMovieReview } from "./IMovieReview";
import { IUser } from "./IUser";

export interface IMovieReviewByUserAggregate {
  readonly user: IUser;
  addMovieReview(movieReview: IMovieReview): Promise<void>;
}

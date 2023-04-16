import { IMovieReview } from "../interfaces/IMovieReview";
import { IMovieReviewRepository } from "../interfaces/IMovieReviewRepository";

export class MockMovieReviewRepository implements IMovieReviewRepository {
  private movieReviews: IMovieReview[] = [];

  async save(movieReview: IMovieReview): Promise<void> {
    this.movieReviews.push(movieReview);
    console.log(`MockMovieReviewRepository: ! `,this.movieReviews)
    return Promise.resolve();
  }
  
  get(userId: string, movieId: string): IMovieReview | undefined {
    return this.movieReviews.find((review) => review.userId === userId && review.movieId === movieId);
  }
  
}

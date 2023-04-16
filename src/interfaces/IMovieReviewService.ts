
interface IMovieReviewService {
  addMovieReview(movieId: string, userId: string, rating: number, review: string): void;
  updateMovieReview(movieReviewId: string, rating: number, review: string): void;
  deleteMovieReview(movieReviewId: string): void;
}

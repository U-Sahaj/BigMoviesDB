export interface IMovieReview {
  readonly movieId: string;
  readonly userId: string;
  readonly reviewText: string;
  readonly rating: number;
  readonly createdAt: Date;
}
import { IMovie } from "../interfaces/IMovie";
import { IMovieReview } from "../interfaces/IMovieReview";
import { IMovieReviewRepository } from "../interfaces/IMovieReviewRepository";


export class MovieReviewRepository implements IMovieReviewRepository {
  private readonly movieReviewsMap: Map<string, IMovieReview>;

  private static instance: MovieReviewRepository;

  private constructor(private readonly movieReviews: IMovieReview[]) {
    this.movieReviewsMap = new Map(movieReviews.map(movieReview => [movieReview.movieId, movieReview]));
  }

  static create(movieReviews: IMovieReview[]): MovieReviewRepository {
    if (!MovieReviewRepository.instance) {
      MovieReviewRepository.instance = new MovieReviewRepository(movieReviews);
    }
    return MovieReviewRepository.instance;
  }

  static getInstance(): MovieReviewRepository {
    if (!MovieReviewRepository.instance) {
      throw new Error("MovieRepository has not been created.");
    }
    return MovieReviewRepository.instance;
  }
  
  save(movieReview: IMovieReview): void {
    this.movieReviewsMap.set(`${movieReview.userId}-${movieReview.movieId}`, movieReview);
    console.log(`MovieReviewRepository: ! `,this.movieReviewsMap)
  }

  get(userId: string, movieId: string): IMovieReview | undefined {
    return this.movieReviewsMap.get(`${userId}-${movieId}`);
  }
  
}

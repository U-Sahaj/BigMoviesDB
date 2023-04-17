import { IMovieReview } from "../interfaces/IMovieReview";
import { IMovieReviewRepository } from "../interfaces/IMovieReviewRepository";
import { ISimilarityScore } from "../interfaces/ISimilarityScore";
import { ISimilarityScoreRepository } from "../interfaces/ISimilarityScoreRepository";
import { IUser } from "../interfaces/IUser";
import { IResult } from "../interfaces/IResult";
import { SimilarityScoreCalculator } from "../utilities/SimilarityScoreCalculator";
import { IUserPrefRepository } from "../interfaces/IUserPrefRepository";
import { IMovieRepository } from "../interfaces/IMovieRepository";

export class MovieReviewByUserAggregate {

  constructor(private readonly user: IUser,
    private readonly userPrefRepository : IUserPrefRepository,
    private readonly movieRepository: IMovieRepository,
    private readonly movieReviewRepository: IMovieReviewRepository,
    private readonly similarityScoreRepository: ISimilarityScoreRepository,
    private readonly movieReviews: IMovieReview[] = [], 
    private similarityScores: ISimilarityScore[] = []) {}

  async addMovieReview(movieReview: IMovieReview): Promise<IResult<IMovieReview[]>> {
    if (movieReview.userId !== this.user.id) {
      return { success: false, message: 'Cannot add movie review for a different user' };
    }
    // console.log(`MovieReviewByUserAggregate: ! `,this.user.id)

    const userPref = this.userPrefRepository.getUserPreferences(this.user.id);
    if (!userPref) {
      return { success: false, message: `User preferences not found for user ${this.user.id}.` };
    }
    // console.log(`MovieReviewByUserAggregate: @ `,userPref)

    const matchingMovies = this.movieRepository.getMoviesMatchingUserPreferences(userPref, "");
    if (matchingMovies.length === 0) {
      return { success: false, message: `No matching movies found for user ${this.user.id}.` };
    }
    // console.log(`MovieReviewByUserAggregate: # `,matchingMovies)

    this.similarityScores = SimilarityScoreCalculator.calculate(userPref, matchingMovies);
    for (const score of this.similarityScores) {
      this.similarityScoreRepository.save(score)
    }
    // console.log(`MovieReviewByUserAggregate: % `,this.similarityScores)

    const movieReviewVO = {
      ...movieReview,
      createdAt: new Date(),
    };
  
    this.movieReviews.push(movieReview);
    // console.log(`MovieReviewByUserAggregate: ^ `,this.movieReviews)

    this.movieReviewRepository.save(movieReview);

    return { success: true };

  }

  getMovieReviewsByUser(userId: string): IMovieReview[] {
    return this.movieReviews.filter((review) => review.userId === userId);
  }
}

          
// class MovieReviewByUserAggregate implements IMovieReviewByUserAggregate {
//   constructor(
//     private readonly userPreferenceRepository: IUserPrefRepository,
//     private readonly movieRepository: IMovieRepository,
//     private readonly movieReviewRepository: IMovieReviewRepository,
//     private readonly similarityScoreRepository: ISimilarityScoreRepository,
//     private readonly similarityScoreCalculator: SimilarityScoreCalculator,
//     public readonly user: IUser,
//     private readonly movieReviews
//   ) {}

//   public async addMovieReview(movieReview: IMovieReview): Promise<void> {
//     const [userPreference, movie] = await Promise.all([
//       this.userPreferenceRepository.getUserPreferences(this.user.id),
//       this.movieRepository.getMovie(movieReview.movieId),
//     ]);

//     const similarityScore[]: ISimilarityScore[] = this.similarityScoreCalculator.calculate(userPreference, movie);


//     await Promise.all([
//       this.movieReviewRepository.create(movieReviewEntity),
//       this.similarityScoreRepository.create(similarityScore),
//     ]);
//   }

//   async addMovieReview(movieReview: IMovieReview): Promise<void> {
//     const movieReviewEntity = {
//       ...movieReview,
//       createdAt: new Date(),
//     };

//     this.movieReviews.push(movieReviewEntity);

//     // Update similarity scores based on the new movie review
//     await this.updateSimilarityScores(movieReview);

//     // Save the entire aggregate
//     await this.save();
//   }

//   private async updateSimilarityScores(movieReview: IMovieReview): Promise<void> {
//     // Get all the user preferences for the same movie as the review
//     const movieUserPreferences = await this.userRepository.getUserPreferencesByMovie(movieReview.movieId);

//     // Calculate similarity score for each user preference
//     const similarityScores = movieUserPreferences.map(userPreference => {
//       const similarityScore = this.calculateSimilarityScore(userPreference, movieReview);
//       return { userId: userPreference.userId, movieId: movieReview.movieId, score: similarityScore };
//     });

//     // Add or update the similarity scores for this user in the aggregate
//     similarityScores.forEach(similarityScore => {
//       const index = this.similarityScores.findIndex(
//         s => s.movieId === similarityScore.movieId && s.userId === similarityScore.userId
//       );
//       if (index >= 0) {
//         this.similarityScores[index] = similarityScore;
//       } else {
//         this.similarityScores.push(similarityScore);
//       }
//     });
//   }

//   private async save(): Promise<void> {
//     // Save all entities and value objects in this aggregate
//     await Promise.all([
//       this.userRepository.saveUserPreference(this.userPreference),
//       this.userRepository.saveMovieReviews(this.movieReviews),
//       this.userRepository.saveSimilarityScores(this.similarityScores),
//     ]);
//   }


// }
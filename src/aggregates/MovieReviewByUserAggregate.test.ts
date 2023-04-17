import mongoose, { Model, connect, disconnect, model } from 'mongoose';
import { describe, it, beforeAll, afterAll, beforeEach, afterEach, expect, vi } from 'vitest'
import { User } from '../entities/User';
import { IUser } from '../interfaces/IUser';
import { IUserPrefRepository } from '../interfaces/IUserPrefRepository';
import { IMovieRepository } from '../interfaces/IMovieRepository';
import { ISimilarityScoreRepository } from '../interfaces/ISimilarityScoreRepository';
import { IMovieReviewRepository } from '../interfaces/IMovieReviewRepository';
import { IUserPreference } from '../interfaces/IUserPreference';
import { MovieRepository } from '../repositories/MovieRepository';
import { MovieReviewByUserAggregate } from './MovieReviewByUserAggregate';
import { Movie } from '../valueobjects/Movie';
import { MovieReviewRepository } from '../repositories/MovieReviewRepository';
import { SimilarityScoreRepository } from '../repositories/SimilarityScoreRepository';
import { UserPreference } from '../valueobjects/UserPreference';
import { UserPrefRepository } from '../repositories/UserPrefRepository';
import { MockMovieReviewRepository } from '../mocks/MockMovieReviewRepository';
import { IMovieReview } from '../interfaces/IMovieReview';
import { IMovieReviewByUserAggregateDocument, movieReviewByUserAggregateSchema } from '../mongoose/MovieReviewByUserAggregate.schema';
import { ISimilarityScore } from '../interfaces/ISimilarityScore';
import { MovieReviewModel } from '../mongoose/MovieReview.schema';
import { SimilarityScoreModel } from '../mongoose/SimilarityScore.schema';
import { userSchema } from '../mongoose/User.schema';

describe('MovieReviewByUserAggregate', () => {
  let user: IUser;
  let userPrefRepository: IUserPrefRepository;
  let movieRepository: IMovieRepository;
  let similarityScoreRepository: ISimilarityScoreRepository;
  let movieReviewRepository: IMovieReviewRepository;
  let movieReviewByUserAggregate: MovieReviewByUserAggregate;

  beforeEach(() => {
    // setup User Preferences Repository
    const userPrefsData: string = `[
      {
        "100": {
          "preferred_languages": [
            "English",
            "Spanish"
          ],
          "favourite_actors": [
            "Denzel Washington",
            "Kate Winslet",
            "Emma Suárez",
            "Tom Hanks"
          ],
          "favourite_directors": [
            "Steven Spielberg",
            "Martin Scorsese",
            "Pedro Almodóvar"
          ]
        }
      },
      {
        "101": {
          "preferred_languages": [
            "English"
          ],
          "favourite_actors": [
            "Denzel Washington",
            "Anne Hathaway",
            "Tom Hanks"
          ],
          "favourite_directors": [
            "Guy Ritchie",
            "Quentin Tarantino"
          ]
        }
      },
      {
        "102": {
          "preferred_languages": [
            "English"
          ],
          "favourite_actors": [
            "Uma Thurman",
            "Charlize Theron",
            "John Travolta"
          ],
          "favourite_directors": [
            "Quentin Tarantino"
          ]
        }
      },
      {
        "103": {
          "preferred_languages": [
            "English"
          ],
          "favourite_actors": [
            "Antonio Banderas",
            "Clint Eastwood",
            "Bruce Willis"
          ],
          "favourite_directors": [
            "Stanley Kubrick",
            "Oliver Stone"
          ]
        }
      },
      {
        "104": {
          "preferred_languages": [
            "English"
          ],
          "favourite_actors": [
            "Anthony Hopkins",
            "Adam Sandler",
            "Bruce Willis"
          ],
          "favourite_directors": [
            "Nora Ephron",
            "Oliver Stone"
          ]
        }
      },
      {
        "105": {
          "preferred_languages": [
            "Spanish"
          ],
          "favourite_actors": [
            "Anthony Hopkins",
            "Bárbara Goenaga",
            "Tenoch Huerta"
          ],
          "favourite_directors": [
            "Amat Escalante",
            "Robert Rodriguez"
          ]
        }
      },
      {
        "106": {
          "preferred_languages": [
            "English",
            "Spanish"
          ],
          "favourite_actors": [
            "Brad Pitt",
            "Robert Downey Jr.",
            "Jennifer Lawrence",
            "Johnny Depp"
          ],
          "favourite_directors": [
            "Steven Spielberg",
            "Martin Scorsese",
            "Ridley Scott"
          ]
        }
      }
    ]`;
    const userPreferences: IUserPreference[] = JSON.parse(userPrefsData).map((user: any) => {
      const userId = Object.keys(user)[0];
      const preferences = user[userId];
      return {
        userId,
        preferred_languages: preferences.preferred_languages,
        favourite_actors: preferences.favourite_actors,
        favourite_directors: preferences.favourite_directors,
      };
    });
    userPrefRepository = UserPrefRepository.create(userPreferences);

    // setup Movies Repository
    const movie1 = new Movie("1", "The Godfather", "en", ["Marlon Brando", "Al Pacino"], ["Francis Ford Coppola"]);
    const movie2 = new Movie("2", "The Shawshank Redemption", "en", ["Tim Robbins", "Morgan Freeman"], ["Frank Darabont"]);
    const movie3 = new Movie("3", "The Dark Knight", "en", ["Christian Bale", "Heath Ledger"], ["Christopher Nolan"]);
    const movie4 = new Movie("4", "The Godfather: Part II", "en", ["Al Pacino", "Robert De Niro"], ["Francis Ford Coppola"]);
    const movie5 = new Movie("5", "Inception", "en", ["Leonardo DiCaprio", "Ellen Page"], ["Christopher Nolan"]);
    const movie6 = new Movie("6", "The Matrix", "en", ["Keanu Reeves", "Carrie-Anne Moss"], ["Lana Wachowski", "Lilly Wachowski"]);
    const movies = [movie1, movie2, movie3, movie4, movie5, movie6];

    movieRepository = MovieRepository.create(movies);

    // setup Movie Reviews Repository
    movieReviewRepository = MovieReviewRepository.create([]);

    // setup Similarity Scores Repository
    similarityScoreRepository = SimilarityScoreRepository.create([]);

    user = new User('107');
    movieReviewByUserAggregate = 
      new MovieReviewByUserAggregate(user,
        userPrefRepository,
        movieRepository,
        movieReviewRepository,
        similarityScoreRepository,);
  })

  it.skip('should add a movie review successfully', async () => {
    const userPref = new UserPreference(user.id, ['Tom Hanks'], ['Steven Spielberg'], ['English']);
    userPrefRepository.save(userPref);

    const movie = new Movie('movie-123', 'Saving Private Ryan', 'en', ['Tom Hanks', 'Matt Damon'], ['Steven Spielberg']);
    movieRepository.save(movie);

    const movieReview = {
      movieId: movie.id,
      userId: user.id,
      reviewText: 'Great movie!',
      rating: 4.5,
      createdAt: new Date(),
    };

    await movieReviewByUserAggregate.addMovieReview(movieReview);

    const savedMovieReview = movieReviewRepository.get(movieReview.userId, movieReview.movieId);
    expect(savedMovieReview).toEqual(movieReview);
    console.log(`MovieReviewByUserAggregate.test: ! `,savedMovieReview)

    const savedSimilarityScores = similarityScoreRepository.get(user.id,movie.id);
    console.log(`MovieReviewByUserAggregate.test: @ `,savedSimilarityScores)

  });

  it.skip('should add a movie review successfully to a mock repository', async () => {
    const userPref = new UserPreference(user.id, ['Tom Hanks'], ['Steven Spielberg'], ['English']);
    userPrefRepository.save(userPref);

    const movie = new Movie('movie-123', 'Saving Private Ryan', 'en', ['Tom Hanks', 'Matt Damon'], ['Steven Spielberg']);
    movieRepository.save(movie);

    let mockMovieReviewRepository: MockMovieReviewRepository
      = new MockMovieReviewRepository();
      
    movieReviewByUserAggregate = 
      new MovieReviewByUserAggregate(user,
        userPrefRepository,
        movieRepository,
        mockMovieReviewRepository,
        similarityScoreRepository,);

    const movieReview = {
      movieId: movie.id,
      userId: user.id,
      reviewText: 'Great movie!',
      rating: 4.5,
      createdAt: new Date(),
    };
    
    await movieReviewByUserAggregate.addMovieReview(movieReview);

console.log(`MovieReviewByUserAggregate.test: # `,mockMovieReviewRepository.get(user.id, movie.id))
    expect(mockMovieReviewRepository.get(user.id, movie.id)).toEqual(movieReview);


  });

  it.skip('should add a movie review successfully by examining mocks', async () => {
      // Arrange
      const userId = 'user1';
      const movieId = 'movie1';
      const reviewText = 'This is a great movie!';
      const rating = 4;

      const user = new User(userId);

      // create mock dependencies
      const mockGetUserPreferences = vi.fn(() => {
        return new UserPreference(userId, ['Tom Hanks'], ['Steven Spielberg'], ['English']);
      });

      const mockGetMoviesMatchingUserPreferences = vi.fn(() => {
        return [new Movie('movie-123', 'Saving Private Ryan', 'en', ['Tom Hanks', 'Matt Damon'], ['Steven Spielberg'])];

      });
      const mockSaveSimilarityScore = vi.fn(() => Promise.resolve());
      const mockSaveMovieReview = vi.fn(() => Promise.resolve());

      // create mock repositories
      userPrefRepository.getUserPreferences = mockGetUserPreferences;
      movieRepository.getMoviesMatchingUserPreferences = mockGetMoviesMatchingUserPreferences;
      similarityScoreRepository.save = mockSaveSimilarityScore;
      movieReviewRepository.save = mockSaveMovieReview;

      const aggregate = new MovieReviewByUserAggregate(
        user,
        userPrefRepository,
        movieRepository,
        movieReviewRepository,
        similarityScoreRepository,
      );

      const movieReview: IMovieReview = {
        userId,
        movieId,
        reviewText,
        rating,
        createdAt: new Date(),
      };

      // Act
      const result = await aggregate.addMovieReview(movieReview);

      // Assert
      expect(result.success).toBe(true);
      expect(mockGetUserPreferences).toHaveBeenCalledTimes(1);
      expect(mockGetUserPreferences).toHaveBeenCalledWith('user1');//(userId);
      expect(mockGetMoviesMatchingUserPreferences).toHaveBeenCalledTimes(1);
      expect(mockSaveSimilarityScore).toHaveBeenCalledTimes(1);
      expect(mockSaveMovieReview).toHaveBeenCalledTimes(1);
      expect(mockSaveMovieReview).toHaveBeenCalledWith(movieReview);
      expect(aggregate.getMovieReviewsByUser(userId)).toEqual([movieReview]);


  });

  describe('MovieReviewByUserAggregate', () => {
    let MovieReviewByUserAggregateModel: Model<IMovieReviewByUserAggregateDocument>;

    beforeAll(async () => {
      await connect('mongodb://test-mongo:27017/TestingDB');
      MovieReviewByUserAggregateModel = model<IMovieReviewByUserAggregateDocument>('MovieReviewByUserAggregate', movieReviewByUserAggregateSchema);
    });
  
    afterAll(async () => {
      await disconnect();
    });
  
    afterEach(async () => {
      // await MovieReviewByUserAggregateModel.deleteMany({});
    });
  
    it.skip('should update all 3 collections in MongoDB in one save call', async () => {
      const user: IUser = { id: 'user123' };
      const movieReview: IMovieReview = {
        movieId: 'movie123',
        userId: 'user123',
        reviewText: 'This is a great movie',
        rating: 4.5,
        createdAt: new Date(),
      };
      const similarityScore: ISimilarityScore = {
        movieId: 'movie123',
        userId: 'user123',
        score: 0.8,
      };
      const movieReviewByUserAggregate: IMovieReviewByUserAggregateDocument = new MovieReviewByUserAggregateModel({
        user,
        movieReviews: [movieReview],
        similarityScores: [similarityScore],
      });

      // const savedMovieReviewByUserAggregate = await movieReviewByUserAggregate.save();
      // expect(savedMovieReviewByUserAggregate.user).toEqual(user);
      // expect(savedMovieReviewByUserAggregate.movieReviews[0]).toEqual(movieReview);
      // expect(savedMovieReviewByUserAggregate.similarityScores[0]).toEqual(similarityScore);  
    
      // Create new documents to save
      const documentsToSave = {
        user: user.id,
        movieReviews: [movieReview],
        similarityScores: [similarityScore]
      }

      // Save all documents at once using insertMany
      await MovieReviewByUserAggregateModel.insertMany([documentsToSave]);

    
    
    });

    it('should update all 3 separate collections in MongoDB in one save call', async () => {
      const user: IUser = { id: 'user123' };
      const movieReview: IMovieReview = {
        movieId: 'movie123',
        userId: 'user123',
        reviewText: 'This is a great movie',
        rating: 4.5,
        createdAt: new Date(),
      };
      const similarityScore: ISimilarityScore = {
        movieId: 'movie123',
        userId: 'user123',
        score: 0.8,
      };
      
      // Convert test data to Mongoose documents
      const UserModel = mongoose.model<IUser>('User', userSchema);
      
      const userDoc = await UserModel.create(user);
      const movieReviewDoc = await MovieReviewModel.create(movieReview);
      const similarityScoreDoc = await SimilarityScoreModel.create(similarityScore);

      // Insert test data into collections using a transaction
      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        await userDoc.save({ session });
        await movieReviewDoc.save({ session });
        await similarityScoreDoc.save({ session });

        // Create aggregate and save to the MovieReviewByUserAggregate collection
        const aggregateDoc = new MovieReviewByUserAggregateModel({
          user: userDoc,
          movieReviews: [movieReviewDoc],
          similarityScores: [similarityScoreDoc],
        });
        await aggregateDoc.save({ session });

        await session.commitTransaction();

      } catch (error) {
        // Abort the transaction if there was an error
        await session.abortTransaction();
        console.error(error);
      } finally {
        // End the transaction
        session.endSession();
      }

      // Verify that data was inserted into collections
      const users = await UserModel.find();
      console.log(users); // should contain the test user
      const movieReviews = await MovieReviewModel.find();
      console.log(movieReviews); // should contain the test movie review
      const similarityScores = await SimilarityScoreModel.find();
      console.log(similarityScores); // should contain the test similarity score
      const aggregates = await MovieReviewByUserAggregateModel.find();
      console.log(aggregates); // should contain the test aggregate with references to the user, movie review, and similarity score
    
    
    });


  });

});

import { describe, it, beforeAll, afterAll, beforeEach, afterEach, expect } from 'vitest'
import { MovieMongoDBRepository } from './MovieMongoDBRepository';
import { UserPreference } from '../valueobjects/UserPreference';
import { Movie } from '../valueobjects/Movie';
import mongoose, { Model } from 'mongoose';
import { MovieCreditsDocument, MovieCreditsSchema } from '../mongoose/MovieCredits.schema';

describe('MovieMongoDBRepository', () => {
  let movieRepo: MovieMongoDBRepository;

  beforeAll(async () => {
    movieRepo = await MovieMongoDBRepository.create("test-mongo:27017", "BigMoviesDB", "MovieCredits");
  });

  afterAll(async () => {
  });

  it('should return movies matching user preference and search text', () => {
    const userPref: UserPreference = {
      userId: '100',
      favouriteActors: ['Al Pacino'],
      favouriteDirectors: ['Sam Mendes'],
      preferredLanguages: ['English']
    };
    const searchText = 'Sam Mendes' //'Godfather';
    const expectedMovies: Movie[] = [
      new Movie('1', 'The Godfather', 'English', ['Marlon Brando', 'Al Pacino'], ['Francis Ford Coppola']),
      new Movie('4', 'The Godfather: Part II', 'English', ['Al Pacino', 'Robert De Niro'], ['Francis Ford Coppola'])
    ];
    const actualMovies = movieRepo.getMoviesMatchingUserPreferences(userPref, searchText);
    console.log(`MovieMongoDBRepository.test: * `, actualMovies.length)
    expect(actualMovies[0].movieTitle).toEqual('Spectre');
  });
});

describe.skip('MovieMongoDBRepository -> MoviesCredits collection', () => {
  let movieRepo: MovieMongoDBRepository;

  beforeAll(async () => {
    await mongoose.connect(`mongodb://test-mongo:27017/TestingDB`);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  //   console.log(`MovieMongoDBRepository.test: ^ `, )
  it.skip('should insert and retrieve movie credits document', async () => {
    const movieCreditsData = {
      movie_id: '1234',
      title: 'The Matrix',
      cast: [
        { cast_id: 1, name: 'Keanu Reeves' },
        { cast_id: 2, name: 'Carrie-Anne Moss' },
      ],
      crew: [
        { id: 1, job: 'Director', name: 'Lana Wachowski' },
        { id: 2, job: 'Director', name: 'Lilly Wachowski' },
      ],
    };
    const movieCreditsModel: Model<MovieCreditsDocument> = mongoose.model<MovieCreditsDocument>('MovieCredits', MovieCreditsSchema);

    // Insert the document
    const movieCredits = await movieCreditsModel.create(movieCreditsData);
    console.log(`MovieMongoDBRepository.test: * `, movieCredits)

    // Retrieve the document and check its contents
    const retrievedMovieCredits = await movieCreditsModel.findOne({ movie_id: '1234' }).lean();
    console.log(`MovieMongoDBRepository.test: # `, retrievedMovieCredits)
    // map the retrieved documents to plain objects
    if (Array.isArray(retrievedMovieCredits)) {
      const mappedCredits = retrievedMovieCredits.map((doc) => {
        return {
          cast_id: doc.cast_id,
          name: doc.name,
          job: doc.job,
          id: doc.id,
        };
      });
          // assert that the mapped credits are deep equal to the original data
      expect(mappedCredits).to.deep.equal(movieCreditsData);

    }

  });

  it('should find one movie from BigMoviesDB', async () => {
    const movieCreditsModel: Model<MovieCreditsDocument> = mongoose.model<MovieCreditsDocument>('MovieCredits', MovieCreditsSchema, 'MovieCredits');
    const retrievedMovieCredits = await movieCreditsModel.findOne({ movie_id: '1930' }).lean();
    console.log(`MovieMongoDBRepository.test: @ `, retrievedMovieCredits)

  });


});



import { describe, it, beforeAll, afterAll, beforeEach, afterEach, expect } from 'vitest'
import mongoose, { Model } from 'mongoose';
import { MovieCreditsDocument, MovieCreditsSchema } from '../mongoose/MovieCredits.schema';


describe.skip('MovieMongoDBRepository -> MovieCredits collection', () => {

  beforeAll(async () => {
    await mongoose.connect(`mongodb://test-mongo:27017/BigMoviesDB`);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should find one movie from BigMoviesDB', async () => {
    const movieCreditsModel: Model<MovieCreditsDocument> = mongoose.model<MovieCreditsDocument>('MovieCredit', MovieCreditsSchema, 'MovieCredits');
    // const retrievedMovieCredits = await movieCreditsModel.findOne({ movie_id: '1930' }).lean();

    try {
      const result = await movieCreditsModel.findOne({ movie_id: '1930' });
      console.log(`MMRepository.test: @ `,result);
    } catch (error: any) {
      console.error(`MMRepository.test: # `,error.message);
    }
      
  });


});
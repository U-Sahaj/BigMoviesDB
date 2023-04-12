import { describe, it, beforeAll, afterAll, beforeEach, afterEach, expect } from 'vitest'
import { UserPrefMongoDBRepository } from './UserPrefMongoDBRepository';
import { UserPreference } from '../valueobjects/UserPreference';
import { UserPreferenceDocument, userPreferenceSchema } from '../mongoose/UserPreference.schema';
import mongoose, { Model, Schema, model, connection, Connection } from 'mongoose';



describe.skip("UserPrefMongoDBRepository", () => {
  let userPrefMongoDBRepository: UserPrefMongoDBRepository;

  beforeAll(async () => {
    userPrefMongoDBRepository = await UserPrefMongoDBRepository.create("test-mongo:27017", "BigMoviesDB", "UserPreferences");
  });

  afterAll(async () => {
    // no need to do anything
  });

  it("returns the correct preferences for a given user", async () => {
    const userId = "100";
    const expectedUserPref = new UserPreference(
      userId,
      ["Denzel Washington", "Kate Winslet", "Emma Suárez", "Tom Hanks"],
      ["Steven Spielberg", "Martin Scorsese", "Pedro Almodóvar"],
      ["English", "Spanish"]
    );

    const userPref = userPrefMongoDBRepository.getUserPreferences(userId);
    console.log(`UserPrefMongoDBRepository.test: `, userPref)
    if (userPref) {
      expect(userPref.preferredLanguages.sort()).toEqual(expectedUserPref.preferredLanguages.sort());
      expect(userPref.favouriteActors.sort()).toEqual(expectedUserPref.favouriteActors.sort());
      expect(userPref.favouriteDirectors.sort()).toEqual(expectedUserPref.favouriteDirectors.sort());
    } else {
      console.log(`UserPrefMongoDBRepository.test: FAILED`)
    }

  });
});

describe.skip("UserPrefMongoDBRepository", () => {
  let userPrefMongoDBRepository: UserPrefMongoDBRepository;

  it("returns the correct preferences for a given user", async () => {
    // Define the type for the object you want to insert
    type UserPreferenceInput = {
      [key: string]: {
        preferred_languages: string[];
        favourite_actors: string[];
        favourite_directors: string[];
      };
    };

    const uri = 'test-mongo:27017'
    const dbName = 'TestingDB'
    const colName = 'UserPreferences'
    const userPrefModel: Model<UserPreferenceDocument> = mongoose.model<UserPreferenceDocument>(colName, userPreferenceSchema);

    await mongoose.connect(`mongodb://${uri}/${dbName}`);

    const userPreference = new UserPreference("100", ["Denzel Washington", "Kate Winslet", "Emma Suárez", "Tom Hanks"], ["Steven Spielberg", "Martin Scorsese", "Pedro Almodóvar"], ["English", "Spanish"]);

    const saveResult = await userPrefModel.create(userPreference);
    console.log(`UserPreference saved to DB: `, saveResult);

    const retrievedDoc = await userPrefModel.findOne({userId: "100"}).lean();
    console.log(retrievedDoc);
    

  });
});




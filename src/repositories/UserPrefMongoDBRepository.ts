import mongoose, { Model } from "mongoose";
import { UserPreference } from "../valueobjects/UserPreference";
import { UserPrefRepository } from "./UserPrefRepository";
import { UserPreferenceDocument, userPreferenceSchema } from "../mongoose/UserPreference.schema";


export class UserPrefMongoDBRepository {
  private static _instance: UserPrefMongoDBRepository;
  private static _userPrefRepository: UserPrefRepository;

  private constructor(userPrefs: UserPreference[]) {
    UserPrefMongoDBRepository._userPrefRepository = UserPrefRepository.create(userPrefs);
  }

  static async create(uri: string, dbName: string, colName: string): Promise<UserPrefMongoDBRepository> {
    if (UserPrefMongoDBRepository._instance) {
      return UserPrefMongoDBRepository._instance;
    }
    const userPrefModel: Model<UserPreferenceDocument> = mongoose.model<UserPreferenceDocument>(colName, userPreferenceSchema);

    await mongoose.connect(`mongodb://${uri}/${dbName}`);

    const userPrefsDoc: UserPreferenceDocument[] = await userPrefModel.find().lean();
    console.log(`UserPrefMongoDBRepository: create: `,userPrefsDoc)

    const userPrefs: UserPreference[] = userPrefsDoc.map((data) => {
      return new UserPreference(
        data.userId,
        data.preferredLanguages,
        data.favouriteActors,
        data.favouriteDirectors
      );
    });

    await mongoose.disconnect();
    UserPrefMongoDBRepository._instance = new UserPrefMongoDBRepository(userPrefs);
    return UserPrefMongoDBRepository._instance;
  }

  static getInstance(): UserPrefMongoDBRepository {
    if (!UserPrefMongoDBRepository._instance) {
      throw new Error("UserPrefMongoDBRepository has not been initialized yet");
    }
    return UserPrefMongoDBRepository._instance;
  }
  getUserPreferences(userId: string): UserPreference | undefined {
    return UserPrefMongoDBRepository._userPrefRepository.getUserPreferences(userId);
  }

}
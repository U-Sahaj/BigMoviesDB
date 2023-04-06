import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { UserPrefRepository } from "./UserPrefRepository";
import { IUserPreferences } from "../interfaces/IUserPreferences";

describe("UserRepository", () => {
  let connection: MongoClient;
  let repository: UserPrefRepository;

  beforeAll(async () => {
    console.log(`UserPrefRepository: starting`)

    // dotenv.config()
    console.log(`UserPrefRepository:`,process.env.MOVIES_DB_URI)
    connection = await MongoClient.connect(process.env.MOVIES_DB_URI||'mongodb://test-mongo:27017')
    const db = connection.db('BigMoviesDB');
    console.log(`UserPrefRepository:`,db)
    repository = new UserPrefRepository(db);
  });

  afterAll(async () => {
    await connection.close();
  });

  describe("getUserPreferences", () => {
    it("returns user preferences for the given userId", async () => {
      const userId = "100";
      const expectedPreferences: IUserPreferences = {
        user_id: "100",
        preferred_languages: ["English", "Spanish"],
        favourite_actors: [
          "Denzel Washington",
          "Kate Winslet",
          "Emma Suárez",
          "Tom Hanks",
        ],
        favourite_directors: [
          "Steven Spielberg",
          "Martin Scorsese",
          "Pedro Almodóvar",
        ],
      };
      const preferences = await repository.getUserPreferences(userId);
      expect(preferences).toEqual(expectedPreferences);
    });

    it.skip("returns undefined for a non-existent userId", async () => {
      const userId = "999";
      const preferences = await repository.getUserPreferences(userId);
      expect(preferences).toBeUndefined();
    });
  });
});

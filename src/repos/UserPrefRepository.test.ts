import { Db, MongoClient } from "mongodb";
import dotenv from "dotenv";
import { UserPrefRepository } from "./UserPrefRepository";
import { IUserPreferences } from "../interfaces/IUserPreferences";

describe("UserRepository", () => {
  let connection: MongoClient;
  let repository: UserPrefRepository;
  let db: Db;

  beforeAll(async () => {
    dotenv.config()
    console.log(`UserPrefRepository.test:`,process.env.MOVIES_DB_URI)
    console.log(`UserPrefRepository.test:`,process.env.MOVIES_DB_NAME)
    connection = await MongoClient.connect(process.env.MOVIES_DB_URI||'mongodb://test-mongo:27017')
    db = connection.db(process.env.MOVIES_DB_NAME);
    repository = new UserPrefRepository(db);
  });

  afterAll(async () => {
    await connection.close();
  });


  describe("User preferences data", () => {
    it("should insert user preferences data into the test database", async () => {
      const userPreferencesData = [
        {
          "100": {
            "preferred_languages": ["English", "Spanish"],
            "favourite_actors": [
              "Denzel Washington",
              "Kate Winslet",
              "Emma Suárez",
              "Tom Hanks",
            ],
            "favourite_directors": [
              "Steven Spielberg",
              "Martin Scorsese",
              "Pedro Almodóvar",
            ],
          },
        },
        {
          "101": {
            "preferred_languages": ["English"],
            "favourite_actors": [
              "Denzel Washington",
              "Anne Hathaway",
              "Tom Hanks",
            ],
            "favourite_directors": ["Guy Ritchie", "Quentin Tarantino"],
          },
        },
      ];

      const collection = await db.collection("UserPreferences");
      await collection.insertMany(userPreferencesData);

      const insertedData = await collection.find().toArray();
      expect(insertedData).toEqual(userPreferencesData);
    });
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

    it("returns undefined for a non-existent userId", async () => {
      const userId = "999";
      const preferences = await repository.getUserPreferences(userId);
      expect(preferences).toBeNull();
    });
  });
});

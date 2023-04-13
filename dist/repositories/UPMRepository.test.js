"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const vitest_1 = require("vitest");
(0, vitest_1.describe)('New experimental userPreference model', () => {
    (0, vitest_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connect('mongodb://test-mongo:27017/TestingDB');
    }));
    (0, vitest_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
    }));
    (0, vitest_1.it)('inserts and reads a user preference', () => __awaiter(void 0, void 0, void 0, function* () {
        //---experimental schema
        // Define the UserPreference schema and model
        const UserPreferenceSchema = new mongoose_1.default.Schema({
            userId: {
                type: String,
                required: true,
                unique: true
            },
            preferred_languages: {
                type: [String]
            },
            favourite_actors: {
                type: [String]
            },
            favourite_directors: {
                type: [String]
            }
        });
        const UserPreference = mongoose_1.default.model('UserPreference', UserPreferenceSchema);
        //---
        // Insert the user preference data into the database
        // const userPrefData = [
        //   {
        //     "100": {
        //       "preferred_languages": [
        //         "English",
        //         "Spanish"
        //       ],
        //       "favourite_actors": [
        //         "Denzel Washington",
        //         "Kate Winslet",
        //         "Emma Suárez",
        //         "Tom Hanks"
        //       ],
        //       "favourite_directors": [
        //         "Steven Spielberg",
        //         "Martin Scorsese",
        //         "Pedro Almodóvar"
        //       ]
        //     }
        //   },
        //   {
        //     "101": {
        //       "preferred_languages": [
        //         "English"
        //       ],
        //       "favourite_actors": [
        //         "Denzel Washington",
        //         "Anne Hathaway",
        //         "Tom Hanks"
        //       ],
        //       "favourite_directors": [
        //         "Guy Ritchie",
        //         "Quentin Tarantino"
        //       ]
        //     }
        //   }
        // ];
        // userPrefData.forEach(async (userData) => {
        //   const userId = Object.keys(userData)[0];
        //   const userPrefs = userData[userId as keyof typeof userData];
        //   await UserPreference.create({ userId, ...userPrefs });
        // });
        // Find user preferences data
        // UserPreference.findOne({ preferences: { "100": { $exists: true } } })
        // const userPrefs = UserPreference.find()
        // console.log(`UPMRepository.test: 1 `,userPrefs);
        // const userId = '100';
        // const preferences = {
        //   preferred_languages: ['English', 'Spanish'],
        //   favourite_actors: ['Denzel Washington', 'Kate Winslet', 'Emma Suárez', 'Tom Hanks'],
        //   favourite_directors: ['Steven Spielberg', 'Martin Scorsese', 'Pedro Almodóvar']
        // };
        const userId = '106';
        const preferences = {
            preferred_languages: ['English', 'Spanish'],
            favourite_actors: ['Brad Pitt', 'Robert Downey Jr.', 'Jennifer Lawrence', 'Johnny Depp'],
            favourite_directors: ['Steven Spielberg', 'Martin Scorsese', 'Ridley Scott']
        };
        // Insert user preferences
        // await UserPreference.create({ userId, ...preferences });
        const preferencesData = [{ '102': { preferred_languages: ['English'],
                    favourite_actors: ['Uma Thurman', 'Charlize Theron', 'John Travolta'],
                    favourite_directors: ['Quentin Tarantino']
                },
            },
            {
                '101': {
                    preferred_languages: ['English'],
                    favourite_actors: ['Denzel Washington', 'Anne Hathaway', 'Tom Hanks'],
                    favourite_directors: ['Guy Ritchie', 'Quentin Tarantino']
                },
            },
            {
                '104': {
                    preferred_languages: ['English'],
                    favourite_actors: ['Anthony Hopkins', 'Adam Sandler', 'Bruce Willis'],
                    favourite_directors: ['Nora Ephron', 'Oliver Stone']
                },
            },
            {
                '105': {
                    preferred_languages: ['Spanish'],
                    favourite_actors: ['Anthony Hopkins', 'Bárbara Goenaga', 'Tenoch Huerta'],
                    favourite_directors: ['Amat Escalante', 'Robert Rodriguez']
                },
            },
            {
                '106': {
                    preferred_languages: ['English', 'Spanish'],
                    favourite_actors: [
                        'Brad Pitt',
                        'Robert Downey Jr.',
                        'Jennifer Lawrence',
                        'Johnny Depp'
                    ],
                    favourite_directors: ['Steven Spielberg', 'Martin Scorsese', 'Ridley Scott']
                },
            },
            {
                '103': {
                    preferred_languages: ['English'],
                    favourite_actors: ['Antonio Banderas', 'Clint Eastwood', 'Bruce Willis'],
                    favourite_directors: ['Stanley Kubrick', 'Oliver Stone']
                },
            },
            {
                '100': {
                    preferred_languages: ['English', 'Spanish'],
                    favourite_actors: [
                        'Denzel Washington',
                        'Kate Winslet',
                        'Emma Suárez',
                        'Tom Hanks'
                    ],
                    favourite_directors: ['Steven Spielberg', 'Martin Scorsese', 'Pedro Almodóvar']
                },
            }
        ];
        // for (const pref of preferencesData) {
        //   const userId = Object.keys(pref)[0];
        //   const userPreferences = pref[userId as keyof typeof pref];
        //   await UserPreference.create({ userId, ...userPreferences });
        // }
        // Find user preferences
        const result = yield UserPreference.findOne({ userId });
        // Assertions
        if (result) {
            (0, vitest_1.expect)(result.userId).toEqual(userId);
            (0, vitest_1.expect)(result.preferred_languages).toEqual(preferences.preferred_languages);
            (0, vitest_1.expect)(result.favourite_actors).toEqual(preferences.favourite_actors);
            (0, vitest_1.expect)(result.favourite_directors).toEqual(preferences.favourite_directors);
        }
        else {
            console.log("User preference not found");
        }
    }));
});
// const userPreferencesData: IUserPreferences = {
//   "100": {
//     "preferred_languages": ["English", "Spanish"],
//     "favourite_actors": ["Denzel Washington", "Kate Winslet", "Emma Suárez", "Tom Hanks"],
//     "favourite_directors": ["Steven Spielberg", "Martin Scorsese", "Pedro Almodóvar"]
//   },
//   "101": {
//     "preferred_languages": ["English"],
//     "favourite_actors": ["Denzel Washington", "Anne Hathaway", "Tom Hanks"],
//     "favourite_directors": ["Guy Ritchie", "Quentin Tarantino"]
//   }
// };

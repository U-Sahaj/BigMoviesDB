import mongoose, { Model, Schema, model } from 'mongoose';
import { describe, it, beforeEach, afterEach, expect, beforeAll, afterAll } from 'vitest'


describe('New experimental userPreference model', () => {
  
    beforeAll(async () => {
      await mongoose.connect('mongodb://test-mongo:27017/TestingDB');
    });
  
    afterAll(async () => {
      await mongoose.disconnect();
    });
  
    it('inserts and reads a user preference', async () => {


      //---experimental schema
      // Define the UserPreference schema and model
      const UserPreferenceSchema = new mongoose.Schema({
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

      const UserPreference = mongoose.model('UserPreference', UserPreferenceSchema);
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
        favourite_actors: ['Brad Pitt','Robert Downey Jr.','Jennifer Lawrence','Johnny Depp'],
        favourite_directors: ['Steven Spielberg', 'Martin Scorsese', 'Ridley Scott']
      };
     
  
      // Insert user preferences
      // await UserPreference.create({ userId, ...preferences });
  
      const preferencesData = [  {    '102': {      preferred_languages: [ 'English' ],
            favourite_actors: [ 'Uma Thurman', 'Charlize Theron', 'John Travolta' ],
            favourite_directors: [ 'Quentin Tarantino' ]
          },
        },
        {
          '101': {
            preferred_languages: [ 'English' ],
            favourite_actors: [ 'Denzel Washington', 'Anne Hathaway', 'Tom Hanks' ],
            favourite_directors: [ 'Guy Ritchie', 'Quentin Tarantino' ]
          },
        },
        {
          '104': {
            preferred_languages: [ 'English' ],
            favourite_actors: [ 'Anthony Hopkins', 'Adam Sandler', 'Bruce Willis' ],
            favourite_directors: [ 'Nora Ephron', 'Oliver Stone' ]
          },
        },
        {
          '105': {
            preferred_languages: [ 'Spanish' ],
            favourite_actors: [ 'Anthony Hopkins', 'Bárbara Goenaga', 'Tenoch Huerta' ],
            favourite_directors: [ 'Amat Escalante', 'Robert Rodriguez' ]
          },
        },
        {
          '106': {
            preferred_languages: [ 'English', 'Spanish' ],
            favourite_actors: [
              'Brad Pitt',
              'Robert Downey Jr.',
              'Jennifer Lawrence',
              'Johnny Depp'
            ],
            favourite_directors: [ 'Steven Spielberg', 'Martin Scorsese', 'Ridley Scott' ]
          },
        },
        {
          '103': {
            preferred_languages: [ 'English' ],
            favourite_actors: [ 'Antonio Banderas', 'Clint Eastwood', 'Bruce Willis' ],
            favourite_directors: [ 'Stanley Kubrick', 'Oliver Stone' ]
          },
        },
        {
          '100': {
            preferred_languages: [ 'English', 'Spanish' ],
            favourite_actors: [
              'Denzel Washington',
              'Kate Winslet',
              'Emma Suárez',
              'Tom Hanks'
            ],
            favourite_directors: [ 'Steven Spielberg', 'Martin Scorsese', 'Pedro Almodóvar' ]
          },
        }
      ];

      // for (const pref of preferencesData) {
      //   const userId = Object.keys(pref)[0];
      //   const userPreferences = pref[userId as keyof typeof pref];
      //   await UserPreference.create({ userId, ...userPreferences });
      // }

      // Find user preferences
      const result = await UserPreference.findOne({ userId });
  
      // Assertions
      if (result) {

        expect(result.userId).toEqual(userId);
        expect(result.preferred_languages).toEqual(preferences.preferred_languages);
        expect(result.favourite_actors).toEqual(preferences.favourite_actors);
        expect(result.favourite_directors).toEqual(preferences.favourite_directors);
  
      } else {
        console.log("User preference not found");
      }

      

    });
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

  
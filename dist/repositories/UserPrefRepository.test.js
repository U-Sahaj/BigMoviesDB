"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const UserPrefRepository_1 = require("./UserPrefRepository");
vitest_1.describe.skip('UserPrefRepository', () => {
    let repo;
    (0, vitest_1.beforeAll)(() => {
        const userPrefsData = `[
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
        const userPreferences = JSON.parse(userPrefsData).map((user) => {
            const userId = Object.keys(user)[0];
            const preferences = user[userId];
            return {
                userId,
                preferred_languages: preferences.preferred_languages,
                favourite_actors: preferences.favourite_actors,
                favourite_directors: preferences.favourite_directors,
            };
        });
        // console.log(`UserPrefRepository.test: ! `,userPreferences)
        repo = UserPrefRepository_1.UserPrefRepository.create(userPreferences);
    });
    vitest_1.describe.skip('getUserPreferences()', () => {
        (0, vitest_1.it)('should return the user preferences for a valid user ID', () => {
            const userId = '100';
            const userPref = repo.getUserPreferences(userId);
            (0, vitest_1.expect)(userPref === null || userPref === void 0 ? void 0 : userPref.userId).toEqual(userId);
            (0, vitest_1.expect)(userPref === null || userPref === void 0 ? void 0 : userPref.preferred_languages).toEqual(['English', 'Spanish']);
            (0, vitest_1.expect)(userPref === null || userPref === void 0 ? void 0 : userPref.favourite_actors).toContain('Denzel Washington');
            (0, vitest_1.expect)(userPref === null || userPref === void 0 ? void 0 : userPref.favourite_directors).toContain('Pedro Almodóvar');
        });
        (0, vitest_1.it)('should return undefined for an invalid user ID', () => {
            const userId = '999';
            const userPref = repo.getUserPreferences(userId);
            (0, vitest_1.expect)(userPref).toBeUndefined();
        });
    });
});

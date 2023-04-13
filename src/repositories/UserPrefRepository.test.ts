import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { UserPrefRepository } from './UserPrefRepository';
import { IUserPreference } from '../interfaces/IUserPreference';
import { UserPreference } from '../valueobjects/UserPreference';

describe('UserPrefRepository', () => {
  let repo: UserPrefRepository;

  beforeAll(() => {
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
        
        
    // console.log(`UserPrefRepository.test: ! `,userPreferences)

    repo = UserPrefRepository.create(userPreferences);

  });

  describe('getUserPreferences()', () => {
    it('should return the user preferences for a valid user ID', () => {
      const userId = '100';
      const userPref = repo.getUserPreferences(userId);
      expect(userPref?.userId).toEqual(userId);
      expect(userPref?.preferred_languages).toEqual(['English', 'Spanish']);
      expect(userPref?.favourite_actors).toContain('Denzel Washington');
      expect(userPref?.favourite_directors).toContain('Pedro Almodóvar');
    });

    it('should return undefined for an invalid user ID', () => {
      const userId = '999';
      const userPref = repo.getUserPreferences(userId);
      expect(userPref).toBeUndefined();
    });
  });
});

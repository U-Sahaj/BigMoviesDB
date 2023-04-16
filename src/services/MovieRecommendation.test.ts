import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { MovieRepository } from '../repositories/MovieRepository';
import { UserPrefRepository } from '../repositories/UserPrefRepository';
import { getMovies, getMoviesFromDB } from './MovieRecommendation';
import { UserPreference } from '../valueobjects/UserPreference';
import { Movie } from '../valueobjects/Movie';
import { MovieMongoDBRepository } from '../repositories/MovieMongoDBRepository';
import { IUserPreference } from '../interfaces/IUserPreference';


describe.skip('MovieService', () => {
  describe.skip('getMovies using in-memory repositories', () => {

    let userPrefs: UserPreference;
    let movies: Movie[];
  
    beforeAll(() => {
      userPrefs = new UserPreference("user123", ['Tom Hanks'], ['Steven Spielberg'], ['English']);
  
      movies = [
        new Movie('1', 'Saving Private Ryan', 'en', ['Tom Hanks', 'Matt Damon'], ['Steven Spielberg']),
        new Movie('2', 'The Terminal', 'en', ['Tom Hanks', 'Catherine Zeta-Jones'], ['Steven Spielberg']),
        new Movie('3', 'Catch Me If You Can', 'en', ['Leonardo DiCaprio', 'Tom Hanks'], ['Steven Spielberg']),
        new Movie('4', 'The Dark Knight', 'en', ['Christian Bale', 'Heath Ledger'], ['Christopher Nolan']),
        new Movie('5', 'Inception', 'en', ['Leonardo DiCaprio'], ['Christopher Nolan']),
      ];
  
      UserPrefRepository.create([userPrefs]);
      MovieRepository.create(movies);
    });
  
    it('should return an array of movies sorted by user preferences and search term, then alphabetically', () => {
      const result = getMovies('user123', 'Tom');
      expect(result).toEqual(['Catch Me If You Can', 'Saving Private Ryan', 'The Terminal']);
    });  

  });


  describe('getMovies using MongoDB backed movie repository', () => {
    let userPrefRepo: UserPrefRepository;
    let movieRepo: MovieMongoDBRepository;
    beforeAll(async () => {
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
      userPrefRepo = UserPrefRepository.create(userPreferences);
      movieRepo = await MovieMongoDBRepository.create("test-mongo:27017", "BigMoviesDB", "");
    });
  
    afterAll(async () => {
    });
  
    it('should return the user preferences for a valid user ID', () => {
      const defaultUserPref: UserPreference = {
        userId: '100',
        favourite_actors: ['Al Pacino'],
        favourite_directors: ['Sam Mendes'],
        preferred_languages: ['English']
      };
  
      const userId = '100';
      const userPref = userPrefRepo.getUserPreferences(userId);
      const searchText = ''
      const foundMovies = movieRepo.getMoviesMatchingUserPreferences(userPref ?? defaultUserPref, searchText);
      console.log(`MovieRecommendation.test: * `, foundMovies.length)
      console.log(`MovieRecommendation.test: * `, foundMovies[0].movieTitle)
      expect(foundMovies[0].movieTitle).toEqual('Titanic');

    });


    it('should return an array of movies sorted by user preferences and search term, then alphabetically', () => {
      const result = getMoviesFromDB('100', 'Tom Hanks');
      expect(result[0]).toEqual('A League of Their Own');

    });  

  });

});
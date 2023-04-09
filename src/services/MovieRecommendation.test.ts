import { describe, it, beforeAll, expect } from 'vitest'
import { MovieRepository } from '../repositories/MovieRepository';
import { UserPrefRepository } from '../repositories/UserPrefRepository';
import { getMovies } from './MovieRecommendation';
import { UserPreferences } from '../valueobjects/UserPreferences';
import { Movie } from '../valueobjects/Movie';


describe('MovieService', () => {
  describe('getMovies', () => {

    let userPrefs: UserPreferences;
    let movies: Movie[];
  
    beforeAll(() => {
      userPrefs = new UserPreferences("user123", ['Tom Hanks'], ['Steven Spielberg'], ['English']);
  
      movies = [
        new Movie('1', 'Saving Private Ryan', 'English', ['Tom Hanks', 'Matt Damon'], ['Steven Spielberg']),
        new Movie('2', 'The Terminal', 'English', ['Tom Hanks', 'Catherine Zeta-Jones'], ['Steven Spielberg']),
        new Movie('3', 'Catch Me If You Can', 'English', ['Leonardo DiCaprio', 'Tom Hanks'], ['Steven Spielberg']),
        new Movie('4', 'The Dark Knight', 'English', ['Christian Bale', 'Heath Ledger'], ['Christopher Nolan']),
        new Movie('5', 'Inception', 'English', ['Leonardo DiCaprio'], ['Christopher Nolan']),
      ];
  
      UserPrefRepository.create([userPrefs]);
      MovieRepository.create(movies);
    });
  
    it('should return an array of movies sorted by user preferences and search term, then alphabetically', () => {
      const result = getMovies('user123', 'Tom');
      expect(result).toEqual(['Catch Me If You Can', 'Saving Private Ryan', 'The Terminal']);
    });
  

  });
});
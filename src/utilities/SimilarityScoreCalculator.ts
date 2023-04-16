import { IMovie } from "../interfaces/IMovie";
import { ISimilarityScore } from "../interfaces/ISimilarityScore";
import { IUserPreference } from "../interfaces/IUserPreference";

export class SimilarityScoreCalculator {
  static calculate(userPref: IUserPreference, movies: IMovie[]): ISimilarityScore[] {
    const similarityScores: ISimilarityScore[] = [];

    // Calculate similarity score for each movie
    for (const movie of movies) {
      let score = 0;

      // Compare preferred language
      for (const language of userPref.preferred_languages) {
        if (movie.originalLanguage === language) {
          score += 1;
        }
      }

      // Compare favourite actors
      for (const actor of userPref.favourite_actors) {
        if (movie.actors.includes(actor)) {
          score += 1;
        }
      }

      // Compare favourite directors
      for (const director of userPref.favourite_directors) {
        if (movie.directors.includes(director)) {
          score += 1;
        }
      }

      // Add similarity score to the array
      similarityScores.push({
        movieId: movie.id,
        userId: userPref.userId,
        score: score
      });
    }

    return similarityScores;
  }
}

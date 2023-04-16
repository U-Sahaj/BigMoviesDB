import { ISimilarityScore } from "../interfaces/ISimilarityScore";

export class SimilarityScore implements ISimilarityScore {
  constructor(
    public readonly movieId: string,
    public readonly userId: string,
    public readonly score: number,
  ) {}

  equals(other: SimilarityScore): boolean {
    return (
      this.movieId === other.movieId &&
      this.userId === other.userId &&
      this.score === other.score
    );
  }
}


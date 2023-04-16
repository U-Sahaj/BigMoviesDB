export interface ISimilarityScore {
  readonly movieId: string;
  readonly userId: string;
  readonly score: number;
}
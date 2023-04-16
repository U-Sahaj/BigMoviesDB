import { ISimilarityScore } from "../interfaces/ISimilarityScore";
import { ISimilarityScoreRepository } from "../interfaces/ISimilarityScoreRepository";

export class SimilarityScoreRepository implements ISimilarityScoreRepository {
  private readonly scoresMap: Map<string, number>;

  private static instance: ISimilarityScoreRepository;

  private constructor(scores: ISimilarityScore[] = []) {
    this.scoresMap = new Map(
      scores.map(score => [`${score.userId}-${score.movieId}`, score.score])
    );
    // console.log(`SimilarityScoreRepository: constructor: `)
  }
  static create(similarityScores: ISimilarityScore[]): ISimilarityScoreRepository {
    if (!SimilarityScoreRepository.instance) {
      SimilarityScoreRepository.instance = new SimilarityScoreRepository(similarityScores);
    }
    return SimilarityScoreRepository.instance;
  }

  static getInstance(): ISimilarityScoreRepository {
    if (!SimilarityScoreRepository.instance) {
      throw new Error("SimilarityScoreRepository has not been created.");
    }
    return SimilarityScoreRepository.instance;
  }

  public async save(score: ISimilarityScore): Promise<void> {
    this.scoresMap.set(`${score.userId}-${score.movieId}`, score.score);
  }

  public async get(userId: string, movieId: string): Promise<number | undefined> {
    return this.scoresMap.get(`${userId}-${movieId}`);
  }

}

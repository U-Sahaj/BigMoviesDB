import { IMovie } from "../interfaces/IMovie";

export class Movie implements IMovie {
  constructor(
    public readonly id: string,
    public readonly movieTitle: string,
    public readonly originalLanguage: string,
    public readonly actors: string[],
    public readonly directors: string[]
  ) {}
}

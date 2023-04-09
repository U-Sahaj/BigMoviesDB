export class Movie {
  readonly id: string;
  readonly title: string;
  readonly originalLanguage: string;
  readonly cast: string[];
  readonly directors: string[];

  constructor(id: string, title: string, originalLanguage: string, cast: string[], directors: string[]) {
    this.id = id;
    this.title = title;
    this.originalLanguage = originalLanguage;
    this.cast = cast;
    this.directors = directors;
  }

  equals(other: Movie): boolean {
    return (
      this.id === other.id &&
      this.title === other.title &&
      this.originalLanguage === other.originalLanguage &&
      this.cast.length === other.cast.length &&
      this.directors.length === other.directors.length &&
      this.cast.every((actor) => other.cast.includes(actor)) &&
      this.directors.every((director) => other.directors.includes(director))
    );
  }
}

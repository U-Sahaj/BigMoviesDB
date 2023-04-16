import { IUser } from "../interfaces/IUser";


export class User implements IUser {
  readonly id: string;
  private watchedMovieIds: string[];

  constructor(id: string) {
    this.id = id;
    this.watchedMovieIds = [];
  }
}

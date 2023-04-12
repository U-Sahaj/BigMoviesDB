import { ICast } from "../mongoose/MovieCredits.schema";

export class Cast implements ICast {
  constructor(public readonly cast_id: number, public readonly name: string) {}
}


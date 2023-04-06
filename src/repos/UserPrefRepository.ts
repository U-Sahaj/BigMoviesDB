import { Collection, Db } from 'mongodb';
import { IUserPreferences } from '../interfaces/IUserPreferences';



export class UserPrefRepository {
  private readonly USER_PREFS_COLLECTION = 'UserPreferences';
  private readonly userPrefsCollection: Collection;

  constructor(db: Db) {
    this.userPrefsCollection = db.collection(this.USER_PREFS_COLLECTION);
  }

  async getUserPreferences(userId: string): Promise<IUserPreferences | null> {
    const query = { [userId]: { $exists: true } };
    const projection = { _id: 0, [userId]: 1 };
    const result = await this.userPrefsCollection.findOne(query, { projection });
    if (result) {
      return { user_id: userId, ...result[userId] };
    }
    return null;
  }
}

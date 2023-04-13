"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPrefRepository = void 0;
class UserPrefRepository {
    constructor(userPrefs) {
        this._userPrefs = new Map(userPrefs.map(userPref => [userPref.userId, userPref]));
        // console.log(`UserPrefRepository: constructor: `,this._userPrefs)
    }
    static create(userPrefs) {
        if (!UserPrefRepository.instance) {
            UserPrefRepository.instance = new UserPrefRepository(userPrefs);
        }
        return UserPrefRepository.instance;
    }
    static getInstance() {
        if (!UserPrefRepository.instance) {
            throw new Error("UserPrefRepository has not been created.");
        }
        return UserPrefRepository.instance;
    }
    getUserPreferences(userId) {
        console.log(`UserPrefRepository: * `, this._userPrefs.size);
        return this._userPrefs.get(userId);
    }
}
exports.UserPrefRepository = UserPrefRepository;

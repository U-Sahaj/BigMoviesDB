"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPreference = void 0;
class UserPreference {
    constructor(userId, favourite_actors, favourite_directors, preferred_languages) {
        this.userId = userId;
        this.favourite_actors = favourite_actors;
        this.favourite_directors = favourite_directors;
        this.preferred_languages = preferred_languages;
    }
}
exports.UserPreference = UserPreference;

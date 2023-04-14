import { Document } from 'mongoose'

/**
 * Defines the interface for a User document in MongoDB.
 * @interface
 */
export interface User extends Document {
    /**
     * The user's name, which is a non-required field.
     * @type {string}
     */
    name: string;
    /**
     * The user's email address, which is a required field.
     * @type {string}
     */
    readonly email: string;
    /**
     * The user's password, which is a required field.
     * @type {string}
     */
    readonly password: string;
    /**
     * The user's phone number, which is a required field.
     * @type {string}
     */
    readonly phone: string;
    /**
     * The user's token, which is a required field.
     * @type {string}
     */
    readonly token: string;
    /**
     * The URL of the user's profile photo, which is a non-required field.
     * @type {string}
     */
    urlPhoto: string;
}

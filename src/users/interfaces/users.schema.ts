import * as mongoose from 'mongoose';

/**
 * Defines the schema for the User collection in MongoDB.
 * @typedef {Object} UserSchema
 * @property {String} name - The user's name.
 * @property {String} email - The user's email address, which must be unique.
 * @property {String} password - The user's password.
 * @property {String} address - The user's address.
 * @property {String} phone - The user's phone number.
 * @property {String} urlPhoto - The URL of the user's profile photo.
 * @property {Object} timestamps - Add timestamps for create and update times.
 * @property {String} collection - Set collection name to "users".
 */
// Define the schema for the User collection in MongoDB
export const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true},  // The user's email address, which must be unique
    phone: { type: String},  // The user's phone number
    password: { type: String},  // The user's password
    name: String,  // The user's name
    urlPhoto: String,  // The URL of the user's profile photo
}, {timestamps: true, collection: 'users'});  // Add timestamps for create and update times, and set collection name to "users"

import * as mongoose from 'mongoose';

/**
 * Defines the schema for the User collection in MongoDB.
 * @typedef {Object} UserSchema
 * @property {String} username - The user's username, which must be unique.
 * @property {String} name - The user's name.
 * @property {String} email - The user's email address, which must be unique.
 * @property {String} password - The user's password.
 * @property {String} address - The user's address.
 * @property {String} phone - The user's phone number.
 * @property {String} urlPhoto - The URL of the user's profile photo.
 * @property {Array} contacts - An array of Contact IDs.
 * @property {Object} timestamps - Add timestamps for create and update times.
 * @property {String} collection - Set collection name to "users".
 */
// Define the schema for the User collection in MongoDB
export const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true},        // The user's username, which must be unique
    name: { type: String },                         // The user's name
    email: { type: String, unique: true},           // The user's email address, which must be unique
    password: { type: String},                      // The user's password
    address: { type: String },                      // The user's address
    phone: { type: String},                         // The user's phone number
    urlPhoto: { type: String },                     // The URL of the user's profile photo
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }] // An array of Contact IDs
}, {timestamps: true, collection: 'users'});  // Add timestamps for create and update times, and set collection name to "users"

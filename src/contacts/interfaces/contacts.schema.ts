import * as mongoose from 'mongoose';

/**
 * Defines the schema for the User collection in MongoDB.
 * @typedef {Object} ContactSchema
 * @property {Number} id - The user's ID.
 * @property {String} sourceUser - User's own of Contact..
 * @property {String} username - The user's username.
 * @property {String} name - The user's name.
 * @property {String} email - The user's email address, which must be unique.
 * @property {String} phone - The user's phone number.
 * @property {String} urlPhoto - The URL of the user's profile photo.
 * @property {Object} timestamps - Add timestamps for create and update times.
 * @property {String} collection - Set collection name to "users".
 */
// Define the schema for the User collection in MongoDB
export const ContactSchema = new mongoose.Schema({
    id: { type: String, unique: true},          // The contact's ID.
    sourceUser: { type: String},                // The User's own of Contact.
    username: { type: String},                  // The contact's username.
    name: { type: String},                      // The contact's name.
    phone: { type: String},                     // The contact's email address, which must be unique.
    email: { type: String},                     // The contact's phone number.
    urlPhoto: { type: String},                  // The URL of the user's profile photo.
}, {timestamps: true, collection: 'contacts'}); // Add timestamps for create and update times, and set collection name to "users"

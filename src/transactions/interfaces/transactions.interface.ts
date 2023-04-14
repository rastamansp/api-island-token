import { Document } from 'mongoose';
import { User } from 'src/users/interfaces/user.interface';

/**
 * Defines the interface for a User document in MongoDB.
 * @interface
 */
export interface Transaction extends Document {

    readonly userID: string;
    /**
     * The Account's number, which is a non-required field.
     * @type {string}
     */
    type: string;
    /**
     * The Account's number, which is a non-required field.
     * @type {string}
     */
    description: string;
    /**
     * The Account's number, which is a non-required field.
     * @type {string}
     */
    transactionId: string;
    /**
     * The Balance's number, which is a non-required field.
     * @type {string}
     */
    amount: number;
    /**
     * The user's Object, which is a non-required field.
     * @type {User}
     */
    user: User;
    /**
     * The user's name, which is a non-required field.
     * @type {Array<Transaction>}
     */
    readonly transactions: Array<Transaction>;

    date: Date
    
}
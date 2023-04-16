import { Document } from 'mongoose';
import { Transaction } from 'src/transactions/interfaces/transactions.interface';
import { User } from 'src/users/interfaces/user.interface';

/**
 * Defines the interface for a User document in MongoDB.
 * @interface
 */
export interface Account extends Document {

    readonly userID: string;
    /**
     * The Account's number, which is a non-required field.
     * @type {string}
     */
    account: string;
    /**
     * The Balance's number, which is a non-required field.
     * @type {string}
     */
    balance: number;
    /**
     * The user's Object, which is a non-required field.
     * @type {User}
     */
    user: User;
    
}

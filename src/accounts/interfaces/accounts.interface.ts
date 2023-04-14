import { Document } from 'mongoose';
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
    /**
     * The user's name, which is a non-required field.
     * @type {Array<Transaction>}
     */
    readonly transactions: Array<Transaction>;
    
}

export interface Transaction {
    transactionId: string;
    type: string;
    amount: number;
    description: string;
    date: Date;
}
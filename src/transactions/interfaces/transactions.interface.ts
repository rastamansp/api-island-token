import { Document } from 'mongoose';
import { User } from 'src/users/interfaces/user.interface';

/**
 * Defines the interface for a transaction document in MongoDB.
 * @interface
 */
export interface Transaction extends Document {
    /**
     * A string that identifies the transaction.
     * @type {string}
     */
    transaction: string;

    /**
     * The source account ID for the transaction.
     * @type {string}
     */
    sourceAccount: string;

    /**
     * The destination account ID for the transaction.
     * @type {string}
     */
    destinationAccount: string;

    /**
     * The amount of the transaction, which is a non-required field.
     * @type {number}
     */
    amount: number;

    /**
     * The reference for the transaction.
     * @type {string}
     */
    reference: string;

    /**
     * The date of the transaction.
     * @type {Date}
     */
    date: Date;
}

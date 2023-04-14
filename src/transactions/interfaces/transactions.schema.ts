import * as mongoose from "mongoose";

export const TransactionsSchema = new mongoose.Schema({
    userID: {type: String, unique: true},
    balance: {type: Number},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    }
}, {timestamps: true, collection: 'transactions'});
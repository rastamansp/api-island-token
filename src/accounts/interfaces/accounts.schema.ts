import * as mongoose from "mongoose";

export const AccountsSchema = new mongoose.Schema({
    userID: {type: String, unique: true},
    account: {type: String},
    balance: {type: Number},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true, collection: 'accounts'});
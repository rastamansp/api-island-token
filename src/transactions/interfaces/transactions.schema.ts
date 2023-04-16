import * as mongoose from "mongoose";

export const TransactionsSchema = new mongoose.Schema({
    transaction:        {type: Number},
    sourceAccount:      {type: String },
    destinationAccount: {type: String },
    amount:             {type: Number},
    reference:          {type: String },
    date:               {type: Date} 
    
}, {timestamps: true, collection: 'transactions'});
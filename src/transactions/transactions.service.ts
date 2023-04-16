import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from './interfaces/transactions.interface';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { CreateTransactionAccountDto } from './dtos/create-transaction-account.dto';
import { AccountsService } from 'src/accounts/accounts.service';
import { Account } from 'src/accounts/interfaces/accounts.interface';


@Injectable()
export class TransactionsService {

    constructor(
        @InjectModel('Transactions') private readonly transactionsModel: Model<Transaction>,
        private readonly usersService: UsersService,
        private readonly accountService: AccountsService) { }

    private readonly logger = new Logger(TransactionsService.name);



    /**
     * List all Transactions
     *
     * @returns An array of all Transactions
     */
    async listAllTransactions(): Promise<Transaction[]> {
        // List all Transactions
        const transactions = await this.transactionsModel.find().exec();
        this.logger.log(`Listing Transaction with data: ${JSON.stringify(transactions)}`);


        if (!transactions) {
            // If no accounts found, throw an error
            throw new NotFoundException(`Accounts not found`)
        }

        return transactions;
    }

    /**
     * Find a account by ID
     *
     * @param _id ID of the account to find
     * @returns The account with the specified ID
     * @throws NotFoundException if no account with the specified ID is found
     */
    async findAccountById(_id: string): Promise<Account> {
        // Find user by ID
        const foundAccount = await this.accountService.findAccountById(_id);

        if (!foundAccount) {
            // If no Account found, throw an error
            throw new NotFoundException(`Account with id ${_id} not found`)
        }

        const foundUser = await this.usersService.findUserById(foundAccount.userID);

        if (!foundUser) {
            // If no user found, throw an error
            throw new NotFoundException(`User with id ${foundAccount.userID} not found`)
        }

        // update User Account
        foundAccount.user = foundUser;

        return foundAccount;
    }



    /**
     * Create a new Transaction Account
     *
     * @param createAccountDto DTO with data for the new user
     * @returns The newly created Transaction
     * @throws BadRequestException if a Params its wrong
     */
    async createAccountTransaction(createTransactionAccountDto: CreateTransactionAccountDto): Promise<Transaction> {

        const { sourceAccount, destinationAccount } = createTransactionAccountDto;
        this.logger.log(`sourceAccount: ${JSON.stringify(createTransactionAccountDto)}`);
        this.logger.log(`${JSON.stringify(destinationAccount)}`, `destinationAccount: `);

        const foundSourceAccount = await this.accountService.findAccountById(sourceAccount);
        const foundDestinationAccount = await this.accountService.findAccountById(destinationAccount);
        const foundSourceUser = await this.usersService.findUserById(foundSourceAccount.userID);
        const foundDestinationUser = await this.usersService.findUserById(foundDestinationAccount.userID);
        
        this.logger.log(`foundSourceAccount: ${JSON.stringify(foundSourceAccount)}`);

        if (!foundSourceAccount) {
            // If a Source Account not exists, throw an error
            throw new BadRequestException(`Source Account with userID ${sourceAccount} not exists`)
        }
        if (!foundDestinationAccount) {
            // If a Destination Account not exists, throw an error
            throw new BadRequestException(`Destination Account with userID ${destinationAccount} not exists`)
        }
        if (!foundSourceUser) {
            // If a Source User not exists, throw an error
            throw new BadRequestException(`Source User Account with userID ${foundSourceUser} not exists`)
        }
        if (!foundDestinationUser) {
            // If a Destination User not exists, throw an error
            throw new BadRequestException(`Destination User Account with userID ${foundDestinationUser} not exists`)
        }

        const createdTransactionAccount = new this.transactionsModel(createTransactionAccountDto);
        return await createdTransactionAccount.save();

    }
}

import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from './interfaces/accounts.interface';
import { Model } from 'mongoose';
import { CreateAccountDto } from './dtos/create-account.dto';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AccountsService {

    constructor(
        @InjectModel('Accounts') private readonly accountModel: Model<Account>
        ,
        private readonly usersService: UsersService) {}

        private readonly logger = new Logger(AccountsService.name);

    /**
     * Create a new user
     *
     * @param createAccountDto DTO with data for the new user
     * @returns The newly created user
     * @throws BadRequestException if a user with the same email already exists
     */
    async createAccount(createAccountDto: CreateAccountDto): Promise<Account> {

        const { account, userID, balance } = createAccountDto

        // Check if account with the same accountNumber already exists
        const foundAccount = await this.accountModel.findOne({_id: userID}).exec();

        if (foundAccount) {
            // If a account with the same accountNumber exists, throw an error
            throw new BadRequestException(`Account with userID ${userID} already exists`)
        } 
            
        const createdAccount = new this.accountModel(createAccountDto);
        return await createdAccount.save();
    
    }
    
    /**
     * List all accounts
     *
     * @returns An array of all accounts
     */
    async listAllAccounts(): Promise<Account[]> {
        // List all accounts
        const accounts = await this.accountModel.find().exec();
        this.logger.log(`Listing accounts with data: ${JSON.stringify(accounts)}`);
        
        return accounts;
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
        const foundAccount = await this.accountModel.findOne({_id}).exec();

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

    
}

import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from './interfaces/accounts.interface';
import { Model } from 'mongoose';
import { CreateAccountDto } from './dtos/create-account.dto';
import { UsersService } from 'src/users/users.service';
import { CreateTransactionAccountDto } from './dtos/create-transaction-account.dto';


@Injectable()
export class AccountsService {

    constructor(
        @InjectModel('Accounts') private readonly accountModel: Model<Account>,
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
        const accounts = await this.accountModel.find().populate("User").exec();
        this.logger.log(`Listing accounts with data: ${JSON.stringify(accounts)}`);
        
        let user;
        accounts.forEach(async conta => {
            
            this.logger.log(`Listing users with data: ${JSON.stringify(conta.userID)}`);
            
            user = await this.usersService.findUserById(conta.userID);

            this.logger.log(`Listing user with data: ${JSON.stringify(user)}`);
            
        });
        

        if (!accounts) {
            // If no accounts found, throw an error
            throw new NotFoundException(`Accounts not found`)
        }

        accounts[0].user = user;

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

    

    /**
     * Create a new Transaction Account
     *
     * @param createAccountDto DTO with data for the new user
     * @returns The newly created user
     * @throws BadRequestException if a user with the same email already exists
     */
    async createAccountTransaction(createTransactionAccountDto: CreateTransactionAccountDto): Promise<Account> {

        const { sourceAccount, destinationAccount } = createTransactionAccountDto;
              
        const foundSourceAccount = await this.accountModel.findById(sourceAccount).exec();
        const foundDestinationAccount = await this.accountModel.findById(destinationAccount).exec();
        const foundSourceUser = await this.usersService.findUserById(foundSourceAccount.userID);
        const foundDestinationUser = await this.usersService.findUserById(foundDestinationAccount.userID);
        
        this.logger.log(`${JSON.stringify(foundSourceAccount)}`, `foundSourceAccount: `);
        
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
            
        const createdTransactionAccount = new this.accountModel(createTransactionAccountDto);
        return await createdTransactionAccount.save();
    
    }
}

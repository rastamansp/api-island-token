import { Controller, Body, Post, UsePipes, ValidationPipe, Get, Param, Put, Logger } from '@nestjs/common';
import { CreateAccountDto } from './dtos/create-account.dto';
import { Account } from './interfaces/accounts.interface';
import { AccountsService } from './accounts.service';
import { updateAccountDto } from './dtos/update-account.dto';
import { ValidationParamsPipe } from 'src/common/pipes/validation-params.pipe';

@Controller('api/v1/accounts')
export class AccountsController {


    /**
     * Logger instance for UsersController
     */
    private readonly logger = new Logger(AccountsController.name);

    constructor(private readonly accountsService: AccountsService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async createAccount(
        @Body() createAccountDto: CreateAccountDto): Promise<Account> {
            this.logger.log(`Creating account with data: ${JSON.stringify(createAccountDto)}`);
            const account = await this.accountsService.createAccount(createAccountDto);
            this.logger.log(`Account created with ID: ${account._id}`);
            return account;
    }
    
    /**
     * List all Accounts
     * 
     * @returns An array of all user documents
     */
    @Get()
    async listAccounts(): Promise<Account[]> {
        this.logger.log(`Listing all accounts.`);
        const accounts = await this.accountsService.listAllAccounts();
        this.logger.log(`Found ${accounts.length} accounts.`);
        return accounts;      
    }

    /**
     * Find a user by ID
     * 
     * @param _id The ID of the user to find
     * @returns The user document with the specified ID
     */
    @Get('/:_id')
    async findAccountById(
        @Param('_id', ValidationParamsPipe) _id: string): Promise<Account> {
        this.logger.log(`Listing Account with ID ${_id}.`);
        const account = await this.accountsService.findAccountById(_id);
        this.logger.log(`Found account with ID ${_id}.`);
        return account;    
    }


}
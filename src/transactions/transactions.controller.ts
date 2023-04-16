import { Controller, Body, Post, UsePipes, ValidationPipe, Get, Param, Put, Logger } from '@nestjs/common';
import { CreateTransactionAccountDto } from './dtos/create-transaction-account.dto';
import { Transaction } from './interfaces/transactions.interface';
import { TransactionsService } from './transactions.service';
import { ValidationParamsPipe } from 'src/common/pipes/validation-params.pipe';


@Controller('api/v1/transactions')
export class TransactionsController {


    /**
     * Logger instance for UsersController
     */
    private readonly logger = new Logger(TransactionsController.name);

    constructor(private readonly transactionsService: TransactionsService) { }


    @Post('/:_id/transaction')
    @UsePipes(ValidationPipe)
    async createTransactionAccount(
        @Body() createTransactionAccountDto: CreateTransactionAccountDto): Promise<Transaction> {
        this.logger.log(`Creating account Transaction with data: ${JSON.stringify(createTransactionAccountDto)}`);
        const transaction = await this.transactionsService.createAccountTransaction(createTransactionAccountDto);
        this.logger.log(`Transaction Account created with ID: ${transaction._id}`);
        return transaction;
    }

    /**
     * List all Transactions
     * 
     * @returns An array of all Transaction documents
     */
    @Get()
    async listTransactions(): Promise<Transaction[]> {
        this.logger.log(`Listing all transactions.`);
        const accounts = await this.transactionsService.listAllTransactions();
        this.logger.log(`Found ${accounts.length} transactions.`);
        return accounts;
    }

}

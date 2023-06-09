import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsSchema } from './interfaces/transactions.schema';
import { UsersModule } from 'src/users/users.module';
import { AccountsModule } from 'src/accounts/accounts.module';


/**
 * The AccountsModule is a module that provides services related to Account management.
 */
@Module({
  /**
   * Import the MongooseModule forFeature with the Account model, specifying the name and schema.
   */
  imports: [MongooseModule.forFeature([{ name: 'Transactions', schema: TransactionsSchema }]),
    UsersModule, AccountsModule],
  /**
   * Declare the AccountsController as a controller to be instantiated and used by the module.
   */
  controllers: [TransactionsController],
  /**
   * Declare the AccountsService as a provider to be instantiated and used by the module.
   */
  providers: [TransactionsService],
  /**
   * Export the UsersService so it can be used by other modules that import this module.
   */
  exports: [TransactionsService]
})
export class TransactionsModule { }

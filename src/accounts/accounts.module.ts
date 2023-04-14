import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsSchema } from './interfaces/accounts.schema';
import { UsersModule } from 'src/users/users.module';


/**
 * The AccountsModule is a module that provides services related to Account management.
 */
@Module({
  /**
   * Import the MongooseModule forFeature with the Account model, specifying the name and schema.
   */
  imports: [MongooseModule.forFeature([{ name: 'Accounts', schema: AccountsSchema }]),
    UsersModule],
  /**
   * Declare the AccountsController as a controller to be instantiated and used by the module.
   */
  controllers: [AccountsController],
  /**
   * Declare the AccountsService as a provider to be instantiated and used by the module.
   */
  providers: [AccountsService],
  /**
   * Export the UsersService so it can be used by other modules that import this module.
   */
  exports: [AccountsService]
})
export class AccountsModule { }

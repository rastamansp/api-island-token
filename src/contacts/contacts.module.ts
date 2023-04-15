import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactSchema } from './interfaces/contacts.schema';


/**
 * The ContactsModule is a module that provides services related to Account management.
 */
@Module({
  /**
   * Import the MongooseModule forFeature with the Account model, specifying the name and schema.
   */
  imports: [
    MongooseModule.forFeature([{ name: 'Contacts', schema: ContactSchema }]),
    UsersModule
  ],
  /**
   * Declare the AccountsController as a controller to be instantiated and used by the module.
   */
  controllers: [ContactsController],
  /**
   * Declare the AccountsService as a provider to be instantiated and used by the module.
   */
  providers: [ContactsService],
  /**
   * Export the UsersService so it can be used by other modules that import this module.
   */
  exports: [ContactsService]
})
export class ContactsModule { }

import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from './interfaces/users.schema';

/**
 * The UsersModule is a module that provides services related to user management.
 */
@Module({
  /**
   * Import the MongooseModule forFeature with the User model, specifying the name and schema.
   */
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema}]) ],
  /**
   * Declare the UsersController as a controller to be instantiated and used by the module.
   */
  controllers: [UsersController],
  /**
   * Declare the UsersService as a provider to be instantiated and used by the module.
   */
  providers: [UsersService],
  /**
   * Export the UsersService so it can be used by other modules that import this module.
   */
  exports: [UsersService]
})
export class UsersModule {}

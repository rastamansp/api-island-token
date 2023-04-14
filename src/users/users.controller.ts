import { Controller, Post, Body, Get, Delete, UsePipes, ValidationPipe, Param, Put, Logger } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { UsersService } from './users.service'
import { User } from './interfaces/user.interface'
import { ValidationParamsPipe } from '../common/pipes/validation-params.pipe'
import { LoginUserDto } from './dtos/login-user.dto';

@Controller('api/v1/users')
export class UsersController {

    /**
     * Logger instance for UsersController
     */
    private readonly logger = new Logger(UsersController.name);

    constructor(private readonly usersService: UsersService) {}

    /**
     * Create a new user
     * 
     * @param createUserDto The DTO representing the data of the new user to create
     * @returns The new user document that was created
     */
    @Post()
    @UsePipes(ValidationPipe)
    async createUser(
        @Body() createUserDto: CreateUserDto): Promise<User> {
        this.logger.log(`Creating user with data: ${JSON.stringify(createUserDto)}`);
        const user = await this.usersService.createUser(createUserDto);
        this.logger.log(`User created with ID: ${user._id}`);
        return user;
    }

    /**
     * Update an existing user by ID
     * 
     * @param _id The ID of the user to update
     * @param updateUserDto The DTO representing the updated data for the user
     * @returns void
     */
    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async updateUser(
        @Body() updateUserDto: UpdateUserDto, 
        @Param('_id', ValidationParamsPipe) _id: string): Promise<void> {
        this.logger.log(`Updating user with ID ${_id}, data: ${JSON.stringify(updateUserDto)}`);
        await this.usersService.updateUser(_id, updateUserDto);
        this.logger.log(`User updated with ID: ${_id}`);
    }

    /**
     * List all users
     * 
     * @returns An array of all user documents
     */
    @Get()
    async listUsers(): Promise<User[]> {
        this.logger.log(`Listing all users.`);
        const users = await this.usersService.listAllUsers();
        this.logger.log(`Found ${users.length} users.`);
        return users;      
    }

    /**
     * Find a user by ID
     * 
     * @param _id The ID of the user to find
     * @returns The user document with the specified ID
     */
    @Get('/:_id')
    async findUserById(
        @Param('_id', ValidationParamsPipe) _id: string): Promise<User> {
        this.logger.log(`Listing user with ID ${_id}.`);
        const user = await this.usersService.findUserById(_id);
        this.logger.log(`Found user with ID ${_id}.`);
        return user;    
    }

    /**
     * Login a user by Username and Pass
     * 
     * @param _id The ID of the user to find
     * @param password The Password of the user to find
     * @returns The user document with the specified ID
     */
    @Post('/login')
    async loginUser(
        @Body() loginUser: LoginUserDto): Promise<User> {
        this.logger.log(`Login user with ID ${loginUser.username}.`);
        this.logger.log(`Login user with ID ${loginUser.password}.`);
        this.logger.log(`Login user with ID ${JSON.stringify(loginUser)}.`);
        const user = await this.usersService.loginUser(loginUser);
        this.logger.log(`Logged user with ID ${loginUser.username}.`);
        this.logger.log(`JWT ${user.token}.`);
        return user;    
    }

    /**
     * Delete a user by ID
     * 
     * @param _id The ID of the user to delete
     * @returns void
     */
    @Delete('/:_id')
    async deleteUser(
        @Param('_id', ValidationParamsPipe) _id: string): Promise<void> {
        this.logger.log(`Deleting user with ID ${_id}.`);
        await this.usersService.deleteUser(_id);
        this.logger.log(`User deleted with ID ${_id}.`);
    }

}

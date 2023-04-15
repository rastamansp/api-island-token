import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { User } from './interfaces/user.interface'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginUserDto } from './dtos/login-user.dto';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class UsersService {

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>) { }

    private readonly logger = new Logger(UsersService.name);

    /**
     * Create a new user
     *
     * @param createUserDto DTO with data for the new user
     * @returns The newly created user
     * @throws BadRequestException if a user with the same email already exists
     */
    async createUser(createUserDto: CreateUserDto): Promise<User> {

        const { email } = createUserDto

        // Check if user with the same email already exists
        const foundUser = await this.userModel.findOne({ email }).exec();

        if (foundUser) {
            // If a user with the same email exists, throw an error
            throw new BadRequestException(`User with email ${email} already exists`)
        }

        const createdUser = new this.userModel(createUserDto);
        return await createdUser.save()

    }

    /**
     * Update an existing user
     *
     * @param _id ID of the user to update
     * @param updateUserDto DTO with updated user data
     * @throws NotFoundException if no user with the specified ID is found
     */
    async updateUser(_id: string, updateUserDto: UpdateUserDto): Promise<void> {

        // Find user by ID
        const foundUser = await this.userModel.findOne({ _id }).exec();

        if (!foundUser) {
            // If no user found, throw an error
            throw new NotFoundException(`User with id ${_id} not found`)
        }

        // Update user with new data
        await this.userModel.findOneAndUpdate({ _id }, { $set: updateUserDto }).exec()

    }

    /**
     * List all users
     *
     * @returns An array of all users
     */
    async listAllUsers(): Promise<User[]> {
        // List all users
        return await this.userModel.find().populate('contacts').exec()
    }

    /**
     * Find a user by ID
     *
     * @param _id ID of the user to find
     * @returns The user with the specified ID
     * @throws NotFoundException if no user with the specified ID is found
     */
    async findUserById(_id: string): Promise<User> {
        // Find user by ID and populate the 'contacts' field with the details of the contacts
        const foundUser = await this.userModel.findOne({ _id }).populate('contacts').exec();

        if (!foundUser) {
            // If no user found, throw an error
            throw new NotFoundException(`User with id ${_id} not found`)
        }
        return foundUser
    }


    /**
     * Find a user by ID
     *
     * @param username ID of the user to find
     * @returns The user with the specified ID
     * @throws NotFoundException if no user with the specified ID is found
     */
    async findUserByUserName(username: string): Promise<User> {
        // Find user by ID
        const foundUser = await this.userModel.findOne({ username }).exec();

        if (!foundUser) {
            // If no user found, throw an error
            throw new NotFoundException(`User with username ${username} not found`)
        }
        return foundUser;
    }

    /**
     * Delete a user
     *
     * @param _id ID of the user to delete
     * @throws NotFoundException if no user with the specified ID is found
     */
    async deleteUser(_id): Promise<any> {

        // Find user by ID
        const foundUser = await this.userModel.findOne({ _id });

        if (!foundUser) {
            // If no user found, throw an error
            throw new NotFoundException(`User with id ${_id} not found`)
        }

        // Delete user
        return await this.userModel.deleteOne({ _id }).exec();
    }

    /**
     * Find a user by ID
     *
     * @param _id ID of the user to find
     * @returns The user with the specified ID
     * @throws NotFoundException if no user with the specified ID is found
     */
    async loginUser(loginUser: LoginUserDto): Promise<User> {
        // Find user by ID
        const foundUser = await this.userModel.findOne({ email: loginUser.username }).exec();

        if (!foundUser) {
            // If no user found, throw an error
            throw new NotFoundException(`User with login Email[${loginUser.username}] Pass[${loginUser.password}] not found`)
        }

        this.logger.log(`senha[${foundUser.password}] ${JSON.stringify(foundUser)}.`);

        this.logger.log(`[${loginUser.username}] Pass[${loginUser.password}] Pass of User ${foundUser.password}.`);


        if (!(foundUser.password === loginUser.password)) {

            throw new NotFoundException(`Password's User [${loginUser.username}] Pass[${loginUser.password}] is wrong`)
        }

        // Importe a chave secreta do arquivo .env ou configure a sua aqui
        const secretKey = process.env.JWT_SECRET || 'mysecretkey';

        // Gera o token JWT com o ID do usuário
        const token = jwt.sign({ sub: foundUser._id }, secretKey);

        // Retorna o token JWT como parte da resposta
        return { ...foundUser, token };

    }

}

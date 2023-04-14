import { IsNotEmpty, IsEmail } from 'class-validator';

/**
 * Data transfer object for creating a new user
 * @class
 */
export class CreateUserDto {
  /**
   * The user's name
   * @type {string}
   * @memberof CreateUserDto
   */
  @IsNotEmpty()
  name: string;

  /**
   * The user's email address
   * @type {string}
   * @memberof CreateUserDto
   */
  @IsEmail()
  email: string;

  /**
   * The user's password
   * @type {string}
   * @memberof CreateUserDto
   */
  @IsNotEmpty()
  password: string;

  /**
   * The user's phone number
   * @type {string}
   * @memberof CreateUserDto
   */
  @IsNotEmpty()
  phone: string;
}

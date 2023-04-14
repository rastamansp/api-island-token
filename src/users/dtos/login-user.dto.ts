import { IsNotEmpty } from 'class-validator'

export class LoginUserDto {

    /**
     * The user's email address, which is a required field.
     * @type {string}
     */
    @IsNotEmpty()
    readonly username: string;

    /**
     * The user's password, which is a required field.
     * @type {string}
     */
    readonly password: string;
}

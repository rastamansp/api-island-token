import { IsNotEmpty } from 'class-validator'

export class UpdateUserDto {

    // Validate that the name field is not empty
    @IsNotEmpty()
    readonly name: string;

    /**
     * The user's email address, which is a required field.
     * @type {string}
     */
    readonly email: string;

    // Validate that the phone field is not empty
    @IsNotEmpty()
    readonly phone: string;

    /**
     * The URL of the user's profile photo, which is a non-required field.
     * @type {string}
     */
    urlPhoto: string;
    
}

import { IsString, IsNotEmpty } from "class-validator";


export class CreateAccountDto {

    @IsString()
    @IsNotEmpty()
    readonly userID: string;

    /**
   * The Account's Number
   * @type {string}
   * @memberof CreateAccountDto
   */
    @IsNotEmpty()
    account: string;

    /**
   * The balance of Account
   * @type {string}
   * @memberof CreateAccountDto
   */
    @IsNotEmpty()
    balance: Number;

}
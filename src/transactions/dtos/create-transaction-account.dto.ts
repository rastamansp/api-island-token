import { IsString, IsNotEmpty, IsNumber, Min, Max } from "class-validator";

export class CreateTransactionAccountDto {


    /**
     * The transaction amount
     * @type {number}
     * @memberof CreateTransactionAccountDto
     */
    @IsNotEmpty()
    @IsString()
    transaction: Number;

    /**
     * The source account number for the transaction
     * @type {string}
     * @memberof CreateTransactionAccountDto
     */
    @IsNotEmpty()
    @IsString()
    sourceAccount: string;

    /**
     * The destination account number for the transaction
     * @type {string}
     * @memberof CreateTransactionAccountDto
     */
    @IsNotEmpty()
    @IsString()
    destinationAccount: string;

    /**
     * The amount of money being transferred in the transaction
     * @type {number}
     * @memberof CreateTransactionAccountDto
     */
    @IsNumber()
    @Min(0.01)
    @Max(1000000)
    amount: number;

    /**
     * A reference or description for the transaction
     * @type {string}
     * @memberof CreateTransactionAccountDto
     */
    @IsNotEmpty()
    @IsString()
    reference: string;

}

import { IsString, IsNotEmpty, IsNumber, Min, Max } from "class-validator";

export class CreateTransactionAccountDto {


    /**
     * The transaction amount
     * @type {number}
     * @memberof CreateTransactionAccountDto
     */
    @IsNotEmpty()
    transaction: Number;

    /**
     * The source account number for the transaction
     * @type {string}
     * @memberof CreateTransactionAccountDto
     */
    @IsNotEmpty()
    sourceAccount: string;

    /**
     * The destination account number for the transaction
     * @type {string}
     * @memberof CreateTransactionAccountDto
     */
    @IsNotEmpty()
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
    reference: string;

}

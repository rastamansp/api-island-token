import { IsString, IsOptional, IsArray, ArrayMinSize } from "class-validator";
import { Transaction } from "../interfaces/accounts.interface";


export class createTransactionAccountDto {

    @IsString()
    @IsOptional()
    descricao: string;

    @IsArray()
    @ArrayMinSize(1)
    transactions: Array<Transaction>

}
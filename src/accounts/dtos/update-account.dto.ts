import { IsString, IsOptional, IsArray, ArrayMinSize } from "class-validator";



export class updateAccountDto {

    @IsString()
    @IsOptional()
    descricao: string;

}
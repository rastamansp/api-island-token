import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateContactDto {
  
  @IsString()
  sourceUser?: string;
  
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}

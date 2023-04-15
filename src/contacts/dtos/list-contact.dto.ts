import { IsString } from 'class-validator';

export class FindContactDto {
  @IsString()
  idUser?: string;

  @IsString()
  idContact?: string;
}

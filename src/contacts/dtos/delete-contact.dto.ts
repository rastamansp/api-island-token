import { IsString } from 'class-validator';

export class DeleteContactDto {
  @IsString()
  idUser?: string;

  @IsString()
  idContact?: string;
}

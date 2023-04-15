import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

/**
 * Data transfer object (DTO) for creating a contact.
 * @export
 * @class CreateContactDto
 */
export class CreateContactDto {
  /**
   * The Source User who want to add Contact.
   * @type {string}
   * @memberof CreateContactDto
   */
  @IsNotEmpty()
  @IsString()
  sourceUser: string;
  
  /**
   * The username of the contact.
   * @type {string}
   * @memberof CreateContactDto
   */
  @IsNotEmpty()
  @IsString()
  username: string;

  /**
   * The name of the contact.
   * @type {string}
   * @memberof CreateContactDto
   */
  @IsNotEmpty()
  @IsString()
  name: string;

  /**
   * The email of the contact.
   * @type {string}
   * @memberof CreateContactDto
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * The phone number of the contact.
   * @type {string}
   * @memberof CreateContactDto
   */
  @IsNotEmpty()
  @IsString()
  phone: string;
}

import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Contact } from './interfaces/contacts.interface';
import { CreateContactDto } from './dtos/create-contact.dto';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteContactDto } from './dtos/delete-contact.dto';
import { UpdateContactDto } from './dtos/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel('Contacts') private readonly contactModel: Model<Contact>,
    private readonly usersService: UsersService) { }

  private readonly logger = new Logger(ContactsService.name);

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const { username, sourceUser } = createContactDto;

    // Check if user with the sourceUser username exists
    const foundSourceUser = await this.usersService.findUserByUserName(sourceUser);
    if (!foundSourceUser) {
      throw new BadRequestException(`User with username ${sourceUser} not exists`);
    }

    // Check if user with the username username exists
    const foundContactUser = await this.usersService.findUserByUserName(username);
    if (!foundContactUser) {
      throw new BadRequestException(`User with username ${username} not exists`);
    }

    // Create the new contact
    const createdContact = new this.contactModel(createContactDto);
    const savedContact = await createdContact.save();

    // Add the new contact's ID to the user's contacts array and save the updated user
    foundSourceUser.contacts.push(savedContact._id);
    await foundSourceUser.save();

    // Save the new contact to the database
    return savedContact;
  }



  /**
   * Find a contact
   *
   * @param username ID of the user want to list contacts
   * @throws NotFoundException if no user with the specified ID is found
   * return Array of Contacts
   */
  async findContactsFromUsername(username: string): Promise<Contact[]> {

    // Find user by ID
    const foundUser = await this.usersService.findUserByUserName(username);

    if (!foundUser) {
      // If no user found, throw an error
      throw new NotFoundException(`User with username ${username} not found`)
    }

    // Find Contact
    return await this.contactModel.find({ username: foundUser.username }).exec();
  }

  /**
     * Delete a contact
     *
     * @param deleteContactDto ID of the contact to delete
     * @throws NotFoundException if no user with the specified ID is found
     */
  async deleteContact(deleteContactDto: DeleteContactDto): Promise<any> {
    const { idUser, idContact } = deleteContactDto;

    // Find user by ID
    const foundUser = await this.usersService.findUserById(idUser);

    if (!foundUser) {
      // If no user found, throw an error
      throw new NotFoundException(`User with id ${idUser} not found`)
    }

    // Delete user
    return await this.contactModel.deleteOne({ _id: idContact }).exec();
  }


  /**
   * List all contacts
   *
   * @returns An array of all User's contacts
   */
  async findAllContacts(): Promise<Contact[]> {
    // List all contacts
    return await this.contactModel.find().exec()
  }


  /**
     * Update an existing Contact
     *
     * @param id ID of the user to update
     * @param updateUserDto DTO with updated user data
     * @throws NotFoundException if no user with the specified ID is found
     */
  async updateContact(id: string, updateContactDto: UpdateContactDto): Promise<void> {

    // Find user by ID
    const foundUser = await this.usersService.findUserByUserName(updateContactDto.sourceUser);

    console.log("foundUser:", JSON.stringify(foundUser));
    console.log("updateContactDto:", JSON.stringify(updateContactDto));
    
    if (!foundUser) {
      // If no user found, throw an error
      throw new NotFoundException(`User with id ${updateContactDto.sourceUser} not found`)
    }
    
    const contact = await this.contactModel.findById(id);
    
    
    console.log("contact:", JSON.stringify(contact));

    // Update user with new data
    //await this.contactModel.updateOne({ _id: id }, { $set: updateContactDto }).exec();
    await this.contactModel.findOneAndUpdate({ _id: id }, { $set: updateContactDto }).exec()

  }

}

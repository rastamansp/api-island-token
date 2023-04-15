import { Controller, Post, Body, Get, Delete, UsePipes, ValidationPipe, Param, Put, Logger } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dtos/create-contact.dto';
import { UpdateContactDto } from './dtos/update-contact.dto';
import { Contact } from './interfaces/contacts.interface';
import { ValidationParamsPipe } from '../common/pipes/validation-params.pipe';
import { DeleteContactDto } from './dtos/delete-contact.dto';

@Controller('api/v1/contacts')
export class ContactsController {
    /**
     * Logger instance for ContactsController
     */
    private readonly logger = new Logger(ContactsController.name);

    constructor(private readonly contactsService: ContactsService) {}

    /**
     * Create a new contact
     * 
     * @param createContactDto The DTO representing the data of the new contact to create
     * @returns The new contact document that was created
     */
    @Post()
    @UsePipes(ValidationPipe)
    async createContact(
        @Body() createContactDto: CreateContactDto): Promise<Contact> {
        this.logger.log(`Creating contact with data: ${JSON.stringify(createContactDto)}`);
        const contact = await this.contactsService.create(createContactDto);
        this.logger.log(`Contact created with ID: ${contact.id}`);
        return contact;
    }

    /**
     * Update an existing contact by ID
     * 
     * @param id The ID of the contact to update
     * @param updateContactDto The DTO representing the updated data for the contact
     * @returns void
     */
    @Put(':id')
    @UsePipes(ValidationPipe)
    async updateContact(
        @Body() updateContactDto: UpdateContactDto, 
        @Param('id', ValidationParamsPipe) id: string): Promise<void> {
        this.logger.log(`Updating contact with ID ${id}, data: ${JSON.stringify(updateContactDto)}`);
        await this.contactsService.updateContact(id, updateContactDto);
        this.logger.log(`Contact updated with ID: ${id}`);
    }

    /**
     * List all contacts
     * 
     * @returns An array of all contact documents
     */
    @Get()
    async listContacts(): Promise<Contact[]> {
        this.logger.log(`Listing all contacts.`);
        const contacts = await this.contactsService.findAllContacts();
        this.logger.log(`Found ${contacts.length} contacts.`);
        return contacts;      
    }

    /**
     * Find a contact by ID
     * 
     * @param id The ID of the contact to find
     * @returns The contact document with the specified ID
     */
    @Get(':id/list')
    async findContactById(@Param('id', ValidationParamsPipe) id: string): Promise<Contact[]> {
        
        this.logger.log(`Searching contact with ID ${id}.`);
        const contacts = await this.contactsService.findContactsFromUsername(id);
        this.logger.log(`Found contact with ID ${id} ${contacts.length} contacts.`);
        return contacts;    
    }

    /**
     * Delete a contact by ID
     * 
     * @param id The ID of the contact to delete
     * @returns void
     */
    @Delete()
    async deleteContact(
        @Body() deleteContactDto: DeleteContactDto
    ): Promise<void> {
        this.logger.log(`Deleting contact with ID ${deleteContactDto.idContact} from user ${deleteContactDto.idUser}.`);
        await this.contactsService.deleteContact(deleteContactDto);
        this.logger.log(`Contact deleted with ID ${deleteContactDto.idContact}.`);
    }
}

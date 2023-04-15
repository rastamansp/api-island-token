import { Document } from 'mongoose';

/**
 * Interface que define a estrutura de um contato no MongoDB.
 * Estende a interface Document do Mongoose para obter recursos adicionais.
 */
export interface Contact extends Document {
    /**
     * O ID do contato.
     * @type {number}
     */
    id: number;
    /**
     * O user que add contato.
     * @type {string}
     */
    sourceUser: string;
    /**
     * O username de contato.
     * @type {string}
     */
    username: string;
    /**
     * O nome do contato.
     * @type {string}
     */
    name: string;
    /**
     * O endereço de e-mail do contato.
     * @type {string}
     */
    email: string;
    /**
     * O número de telefone do contato.
     * @type {string}
     */
    phone: string;

    contacts: [Contact],
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
import { CategoriasModule } from './categorias/categorias.module';
import { DesafiosModule } from './desafios/desafios.module';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { ContactsModule } from './contacts/contacts.module';
import { ContactSchema } from './contacts/interfaces/contacts.schema';
import { UserSchema } from './users/interfaces/users.schema';


/**
 * Main app module.
 */
@Module({
  imports: [
    // Connect to MongoDB using Mongoose
    MongooseModule.forRoot('mongodb://root:example@localhost:27017/admin', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    MongooseModule.forFeature([
      { name: 'Contacts', schema: ContactSchema },
      { name: 'User', schema: UserSchema }
    ]),
    ContactsModule,
    UsersModule,
    // Import submodules
    JogadoresModule,
    CategoriasModule,
    DesafiosModule,
    UsersModule,
    AccountsModule,
    ContactsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
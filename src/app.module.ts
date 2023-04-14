import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
import { CategoriasModule } from './categorias/categorias.module';
import { DesafiosModule } from './desafios/desafios.module';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';


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
    // Import submodules
    JogadoresModule,
    CategoriasModule,
    DesafiosModule,
    UsersModule,
    AccountsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
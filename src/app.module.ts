import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PaiementModule } from './paiement/paiement.module';
import { PaiementMiddleware } from './paiement/paiement.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/entities/users.entity';
import { Paiement } from './paiement/entities/paiement.entity';
import { GetstatusModule } from './getstatus/getstatus.module';
import { LienModule } from './lien/lien.module';
import { Lien } from './lien/entities/lien.entity';
import { getstatus } from './getstatus/entities/getstatus.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // ou tout autre type de base de données supporté
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password:null,
      database: 'apikey',
      entities: [Users,Paiement,Lien,getstatus], // Ajoutez ici vos entités
      synchronize: false, // Ceci synchronisera automatiquement les entités avec la base de données (utilisez uniquement en développement)
    }),
    UsersModule, PaiementModule, GetstatusModule, LienModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {

  
  configure(consumer: MiddlewareConsumer)  {
    consumer.apply(PaiementMiddleware).forRoutes( 
      { path: '/paiement/paymentgateway', method: RequestMethod.GET },
          // Ajoutez autant de routes que nécessaire
    );
  }
}

import { Module } from '@nestjs/common';
import { PaiementService } from './paiement.service';
import { PaiementController } from './paiement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paiement } from './entities/paiement.entity';
import { Users } from 'src/users/entities/users.entity';
import { Lien } from 'src/lien/entities/lien.entity';
import { getstatus } from 'src/getstatus/entities/getstatus.entity';
import { UsersService } from 'src/users/users.service';
import { GetstatusService } from 'src/getstatus/getstatus.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Paiement,Users,Lien,getstatus]),
    HttpModule
    
    // Assurez-vous que le PaiementRepository est importé avec forFeature
    // Autres imports...
  ],
  controllers: [PaiementController],
  providers: [PaiementService,UsersService,GetstatusService],
})
export class PaiementModule {}

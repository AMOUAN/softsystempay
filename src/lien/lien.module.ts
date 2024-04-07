import { Module } from '@nestjs/common';
import { LienService } from './lien.service';
import { LienController } from './lien.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lien } from './entities/lien.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lien]), // Assurez-vous que le PaiementRepository est importé avec forFeature
    // Autres imports...
  ],
  controllers: [LienController],
  providers: [LienService],
})
export class LienModule {}

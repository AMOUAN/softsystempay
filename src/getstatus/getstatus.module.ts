import { Module } from '@nestjs/common';
import { GetstatusService } from './getstatus.service';
import { GetstatusController } from './getstatus.controller';
import { getstatus } from './entities/getstatus.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([getstatus]), // Assurez-vous que le PaiementRepository est importé avec forFeature
    // Autres imports...
  ],
  controllers: [GetstatusController],
  providers: [GetstatusService],
})
export class GetstatusModule {}

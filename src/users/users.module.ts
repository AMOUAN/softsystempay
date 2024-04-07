import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]), // Assurez-vous que le PaiementRepository est importé avec forFeature
    // Autres imports...
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

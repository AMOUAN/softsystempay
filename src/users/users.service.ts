import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
 

  constructor(
    @InjectRepository(Users)
    private UserRepository: Repository<Users>,
  ) {}
  
  async findByBearerToken(bearerToken: string):Promise<boolean>  {
    try {
      
      const user = await this.UserRepository
      .createQueryBuilder('user')
      .where('user.apiToken = :token', { token: bearerToken })
      .getOne();

      // Si aucun utilisateur n'est trouvé avec le token donné, retourner false
      if (!user) {
        return false;
      }

      // Si un utilisateur est trouvé avec le token donné, retourner true
      return true;
    } catch (error) {
      // Gérer les erreurs de manière appropriée (par exemple, enregistrer les erreurs dans les journaux)
      console.error('Erreur lors de la vérification du token Bearer :', error);
      return false; // En cas d'erreur, retourner false
    }
  }
  
  create(createUserDto: CreateUserDto) {
    return this.UserRepository.create(createUserDto);
  }

  findAll() {
    return this.UserRepository.find();
  }

  findOne(id: number) {
    return this.UserRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.UserRepository.update(id, updateUserDto );
  }

  remove(id: number) {
    return this.UserRepository.delete(id);
  }

}

import { Injectable } from '@nestjs/common';
import { CreateLienDto } from './dto/create-lien.dto';
import { UpdateLienDto } from './dto/update-lien.dto';

@Injectable()
export class LienService {
  create(createLienDto: CreateLienDto) {
    return 'This action adds a new lien';
  }

  findAll() {
    return `This action returns all lien`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lien`;
  }

  update(id: number, updateLienDto: UpdateLienDto) {
    return `This action updates a #${id} lien`;
  }

  remove(id: number) {
    return `This action removes a #${id} lien`;
  }
}

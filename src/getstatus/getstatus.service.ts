import { Injectable } from '@nestjs/common';
import { CreateGetstatusDto } from './dto/create-getstatus.dto';
import { UpdateGetstatusDto } from './dto/update-getstatus.dto';

@Injectable()
export class GetstatusService {
  create(createGetstatusDto: CreateGetstatusDto) {
    return 'This action adds a new getstatus';
  }

  findAll() {
    return `This action returns all getstatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} getstatus`;
  }

  update(id: number, updateGetstatusDto: UpdateGetstatusDto) {
    return `This action updates a #${id} getstatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} getstatus`;
  }
}

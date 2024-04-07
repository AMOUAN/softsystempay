import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GetstatusService } from './getstatus.service';
import { CreateGetstatusDto } from './dto/create-getstatus.dto';
import { UpdateGetstatusDto } from './dto/update-getstatus.dto';

@Controller('getstatus')
export class GetstatusController {
  constructor(private readonly getstatusService: GetstatusService) {}

  @Post()
  create(@Body() createGetstatusDto: CreateGetstatusDto) {
    return this.getstatusService.create(createGetstatusDto);
  }

  @Get()
  findAll() {
    return this.getstatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getstatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGetstatusDto: UpdateGetstatusDto) {
    return this.getstatusService.update(+id, updateGetstatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.getstatusService.remove(+id);
  }
}

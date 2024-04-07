import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LienService } from './lien.service';
import { CreateLienDto } from './dto/create-lien.dto';
import { UpdateLienDto } from './dto/update-lien.dto';

@Controller('lien')
export class LienController {
  constructor(private readonly lienService: LienService) {}

  @Post()
  create(@Body() createLienDto: CreateLienDto) {
    return this.lienService.create(createLienDto);
  }

  @Get()
  findAll() {
    return this.lienService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lienService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLienDto: UpdateLienDto) {
    return this.lienService.update(+id, updateLienDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lienService.remove(+id);
  }
}

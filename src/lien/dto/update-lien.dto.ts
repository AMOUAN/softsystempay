import { PartialType } from '@nestjs/mapped-types';
import { CreateLienDto } from './create-lien.dto';

export class UpdateLienDto extends PartialType(CreateLienDto) {}

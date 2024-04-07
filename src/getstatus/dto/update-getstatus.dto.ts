import { PartialType } from '@nestjs/mapped-types';
import { CreateGetstatusDto } from './create-getstatus.dto';

export class UpdateGetstatusDto extends PartialType(CreateGetstatusDto) {}

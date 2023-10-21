import { PickType } from '@nestjs/swagger';
import { Users } from 'src/entities/user.entity';

export class ReadOnlyUserDto extends PickType(Users, [
  'id',
  'email',
  'name',
  'createdAt',
  'updatedAt',
] as const) {}

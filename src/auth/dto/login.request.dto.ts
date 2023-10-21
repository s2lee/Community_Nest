import { PickType } from '@nestjs/swagger';
import { Users } from 'src/entities/user.entity';

export class LoginRequestDto extends PickType(Users, [
  'email',
  'password',
] as const) {}

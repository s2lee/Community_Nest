import { PickType } from '@nestjs/swagger';
import { Posts } from 'src/entities/post.entity';

export class PostsCreateDto extends PickType(Posts, [
  'author',
  'contents',
] as const) {}

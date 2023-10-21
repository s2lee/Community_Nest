import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Posts } from 'src/entities/post.entity';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Posts]), UsersModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}

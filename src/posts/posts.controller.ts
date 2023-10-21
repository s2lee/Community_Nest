import { PostsService } from './posts.service';
import { Controller, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { PostsCreateDto } from './dto/posts.create.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({
    summary: '모든 게시글 가져오기',
  })
  @Get()
  async getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @ApiOperation({
    summary: '게시글 업로드',
  })
  @Post(':id')
  async createPost(@Param('id') id: number, @Body() body: PostsCreateDto) {
    return this.postsService.createPost(id, body);
  }

  @ApiOperation({
    summary: '게시글 좋아요 수 올리기',
  })
  @Patch(':id')
  async plusLike(@Param('id') id: number) {
    return this.postsService.plusLike(id);
  }
}

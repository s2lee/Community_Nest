import { UsersRepository } from 'src/users/users.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PostsCreateDto } from './dto/posts.create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from 'src/entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private postsRepository: Repository<Posts>,
    private readonly usersRepository: UsersRepository,
  ) {}

  async getAllPosts() {
    try {
      const posts = await this.postsRepository.find();
      return posts;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createPost(id: number, postData: PostsCreateDto) {
    try {
      const { contents, author } = postData;

      const validatedAuthor =
        await this.usersRepository.findUserByIdWithoutPassword(author);

      return await this.postsRepository.save({
        author: validatedAuthor.id,
        contents,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async plusLike(id: number) {
    try {
      const post = await this.postsRepository.findOne({ where: { id } });
      post.likeCount += 1;
      return await this.postsRepository.save(post);
    } catch (error) {}
  }
}

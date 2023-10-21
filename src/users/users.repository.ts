import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserRequestDto } from './dto/users.request.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    return await this.usersRepository.find();
  }

  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.usersRepository.exist({ where: { email } });
    return result;
  }

  async create(user: UserRequestDto): Promise<Users> {
    return await this.usersRepository.save(user);
  }

  async findUserByEmail(email: string): Promise<Users | null> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }

  async findUserByIdWithoutPassword(userId: number): Promise<Users | null> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    return user;
  }

  async findByIdAndUpdateImg(id: number, fileName: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    user.imgUrl = `http://localhost:8000/media/${fileName}`;
    const newUser = await this.usersRepository.save(user);
    console.log(newUser);
    return newUser;
  }
}

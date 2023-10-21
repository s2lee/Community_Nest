import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Users } from 'src/entities/user.entity';
import { UserRequestDto } from './dto/users.request.dto';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getAllUser() {
    return await this.usersRepository.findAll();
  }

  async signUp(body: UserRequestDto) {
    const { email, name, password } = body;
    const isUserExist = await this.usersRepository.existsByEmail(email);

    if (isUserExist) {
      throw new UnauthorizedException('해당 유저는 이미 존재합니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return user;
  }

  async uploadImg(user: Users, files: Express.Multer.File[]) {
    const fileName = `users/${files[0].filename}`;

    console.log(fileName);

    const newUser = await this.usersRepository.findByIdAndUpdateImg(
      user.id,
      fileName,
    );
    console.log(newUser);
    return newUser;
  }
}

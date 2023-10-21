import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Length, IsEmail, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Users {
  @ApiProperty({
    example: '3',
    description: 'id',
  })
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @ApiProperty({
    example: 'test@naver.com',
    description: 'email',
    required: true,
  })
  @Column({
    nullable: false,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'testuser',
    description: 'name',
    required: true,
  })
  @Column({
    nullable: false,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '12345',
    description: 'password',
    required: true,
  })
  @Column({
    nullable: false,
  })
  @IsString()
  @Length(3, 10)
  password: string;

  @ApiProperty({
    example: '2023-07-01T00:10:51.108Z',
    description: 'createdAt',
  })
  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    example: '2023-07-01T00:10:51.108Z',
    description: 'updatedAt',
  })
  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;

  @Column({
    nullable: true,
  })
  @IsString()
  imgUrl: string;
}

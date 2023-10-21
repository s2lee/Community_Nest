import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsString, IsDate, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Posts {
  @ApiProperty({
    description: 'id',
  })
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @ApiProperty({
    description: '작성한 유저 id',
  })
  @Column({
    nullable: false,
  })
  @IsNotEmpty()
  author: number;

  @ApiProperty({
    description: '내용',
    required: true,
  })
  @Column({
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  contents: string;

  @ApiProperty({
    description: '좋아요 수',
  })
  @Column({
    default: 0,
  })
  @IsPositive()
  likeCount: number;

  @ApiProperty({
    description: 'createdAt',
  })
  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'updatedAt',
  })
  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;
}

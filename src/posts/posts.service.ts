import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto, CreatePostDto } from './dto/post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.post.findMany();
  }

  async findOne(id: number, authorId: number) {
    const post = await this.prisma.post.findUnique({ where: { id, authorId } });

    if (!post) {
      throw new HttpException(
        {
          success: false,
          error: 'Post not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return post;
  }

  async create(data: CreatePostDto) {
    const post = await this.prisma.post.create({ data });
    return {
      message: 'Post created Successfully',
      data: post,
    };
  }

  async update(id: number, data: PostDto, authorId: number) {
    await this.prisma.post.update({ where: { id, authorId }, data });
    return {
      message: 'Post updated Successfully',
    };
  }

  async remove(id: number, authorId: number) {
    await this.prisma.post.delete({ where: { id, authorId } });
    return {
      message: 'Post deleted Successfully',
    };
  }
}

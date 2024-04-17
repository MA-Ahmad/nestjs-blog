import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.post.findMany();
  }

  async findOne(id: number) {
    return this.prisma.post.findUnique({ where: { id } });
  }

  async create(data: PostDto) {
    return this.prisma.post.create({ data });
  }

  async update(id: number, data: PostDto) {
    return this.prisma.post.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.prisma.post.delete({ where: { id } });
  }
}

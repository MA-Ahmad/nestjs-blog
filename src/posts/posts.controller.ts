import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';
import { Post as PostModel } from '@prisma/client';
import { Public } from 'src/decorators/public.decorator';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Public()
  @Get()
  async findAll(): Promise<PostModel[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    return this.postsService.findOne(+id, +req.user.id);
  }

  @Post()
  async create(@Body() createPostDto: PostDto, @Req() req) {
    return this.postsService.create({
      ...createPostDto,
      authorId: req.user.id,
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: PostDto,
    @Req() req,
  ) {
    return this.postsService.update(+id, updatePostDto, +req.user.id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    return this.postsService.remove(+id, +req.user.id);
  }
}

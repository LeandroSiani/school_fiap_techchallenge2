import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { PostService } from '../services/post.service';
import { IPost } from '../entities/models/post.interface';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  async findAllPublished() {
    return this.postService.findAllPublished();
  }

  @Get('admin')
  async findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  async findOne(id: number) {
    return this.postService.findOne(id);
  }

  @Get('query/:query')
  async findByQuery(query: string) {
    return this.postService.findByQuery(query);
  }

  @Post()
  async create(@Body() post: IPost) {
    post.date = new Date();
    post.isPublished = false;
    post.publishDate = null;
    return this.postService.create(post);
  }

  @Put(':id')
  async update(@Body() post: IPost, id: number) {
    return this.postService.update(id, post);
  }

  @Put('publish/:id')
  async publish(id: number) {
    return this.postService.publish(id);
  }

  @Delete(':id')
  async remove(id: number) {
    return this.postService.remove(id);
  }
}

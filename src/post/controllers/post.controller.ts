import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { BasicAuthGuard } from 'src/shared/guards/auth-basic.guards';
import { z } from 'zod';
import { ZodValidationPipe } from 'src/shared/pipe/zod-validation.pipe';

const postCreateSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Título deve ser preenchido' })
    .max(100, { message: 'Título deve ter no máximo 100 caracteres' }),
  content: z.string().min(5, { message: 'Conteúdo deve ser preenchido' }),
});

const postUpdateSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Título deve ser preenchido' })
    .max(100, { message: 'Título deve ter no máximo 100 caracteres' }),
  content: z.string().min(5, { message: 'Conteúdo deve ser preenchido' }),
  isPublished: z.coerce.boolean(),
  publishDate: z.coerce.date().optional(),
  date: z.coerce.date(),
});

type PostCreate = z.infer<typeof postCreateSchema>;
type PostUpdate = z.infer<typeof postUpdateSchema>;

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  async findAllPublished(
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    return this.postService.findAllPublished(limit, page);
  }

  @ApiBasicAuth()
  @UseGuards(BasicAuthGuard)
  @Get('admin')
  async findAll(@Query('limit') limit: number, @Query('page') page: number) {
    return this.postService.findAll(limit, page);
  }

  @Get(':id')
  async findOne(id: number) {
    return this.postService.findOne(id);
  }

  @Get('query/:query')
  async findByQuery(query: string) {
    return this.postService.findByQuery(query);
  }

  @ApiBasicAuth()
  @UseGuards(BasicAuthGuard)
  @UsePipes(new ZodValidationPipe(postCreateSchema))
  @Post()
  async create(@Body() { title, content }: PostCreate) {
    return this.postService.create({
      title,
      content,
      date: new Date(),
      isPublished: false,
      publishDate: null,
      id: 0,
    });
  }

  @ApiBasicAuth()
  @UseGuards(BasicAuthGuard)
  @UsePipes(new ZodValidationPipe(postUpdateSchema))
  @Put(':id')
  async update(
    @Body() { title, content, date, isPublished, publishDate }: PostUpdate,
    @Param() id: number,
  ) {
    return this.postService.update(id, {
      id: id,
      title,
      content,
      date,
      isPublished,
      publishDate,
    });
  }

  @ApiBasicAuth()
  @UseGuards(BasicAuthGuard)
  @Put('publish/:id')
  async publish(@Param() id: number) {
    return this.postService.publish(id);
  }

  @ApiBasicAuth()
  @UseGuards(BasicAuthGuard)
  @Delete(':id')
  async remove(@Param() id: number) {
    return this.postService.remove(id);
  }
}

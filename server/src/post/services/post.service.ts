import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/entities/post.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async findAll(limit: number, page: number): Promise<Post[]> {
    const offset = (page - 1) * limit;
    return this.postRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findAllPublished(limit: number, page: number): Promise<Post[]> {
    const offset = (page - 1) * limit;
    return this.postRepository.find({
      where: { isPublished: true },
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number): Promise<Post> {
    return this.postRepository.findOneBy({ id });
  }

  async create(post: Post): Promise<Post> {
    return this.postRepository.save(post);
  }

  async update(id: number, post: Post): Promise<Post> {
    await this.postRepository.update(id, post);
    return this.postRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }

  async publish(id: number): Promise<Post> {
    const post = await this.postRepository.findOneBy({ id });
    post.isPublished = true;
    post.publishDate = new Date();
    return this.postRepository.save(post);
  }

  async findByQuery(query: string): Promise<Post[]> {
    console.log(query);
    return this.postRepository.find({
      where: [{ title: ILike(`%${query}%`) }, { content: ILike(`%${query}%`) }],
    });
  }
}

// post.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';

describe('PostService', () => {
  let service: PostService;
  let repository: Repository<Post>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: getRepositoryToken(Post),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    repository = module.get<Repository<Post>>(getRepositoryToken(Post));
  });

  it('deve garantir que o serviço esteja definido', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('deve retornar um array de posts', async () => {
      const result = [new Post()];
      jest.spyOn(repository, 'find').mockResolvedValue(result);

      expect(await service.findAll(10, 1)).toBe(result);
    });
  });

  describe('findAllPublished', () => {
    it('deve retornar um array de posts publicados', async () => {
      const result = [new Post()];
      jest.spyOn(repository, 'find').mockResolvedValue(result);

      expect(await service.findAllPublished(10, 1)).toBe(result);
    });
  });

  describe('findOne', () => {
    it('deve retornar um post único', async () => {
      const result = new Post();
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(result);

      expect(await service.findOne(1)).toBe(result);
    });
  });

  describe('create', () => {
    it('deve salvar um novo post', async () => {
      const result = new Post();
      jest.spyOn(repository, 'save').mockResolvedValue(result);

      expect(await service.create(result)).toBe(result);
    });
  });

  describe('update', () => {
    it('deve atualizar um post existente', async () => {
      const result = new Post();
      jest.spyOn(repository, 'update').mockResolvedValue(undefined);
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(result);

      expect(await service.update(1, result)).toBe(result);
    });
  });

  describe('remove', () => {
    it('deve remover um post', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

      expect(await service.remove(1)).toBe(undefined);
    });
  });

  describe('publish', () => {
    it('deve publicar um post', async () => {
      const result = new Post();
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(result);
      jest.spyOn(repository, 'save').mockResolvedValue(result);

      result.isPublished = true;

      expect(await service.publish(1)).toBe(result);
    });
  });

  describe('findByQuery', () => {
    it('deve retornar posts que correspondem à consulta', async () => {
      const result = [new Post()];
      jest.spyOn(repository, 'find').mockResolvedValue(result);

      expect(await service.findByQuery('test')).toBe(result);
    });
  });
});

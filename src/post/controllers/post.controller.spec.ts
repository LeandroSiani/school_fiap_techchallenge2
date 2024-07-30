// post.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from '../services/post.service';

describe('PostController', () => {
  let controller: PostController;
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: PostService,
          useValue: {
            findAllPublished: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            findByQuery: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            publish: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PostController>(PostController);
    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAllPublished', () => {
    it('deve chamar o método findAllPublished do serviço com os parâmetros limit e page corretos', async () => {
      const limit = 10;
      const page = 1;
      await controller.findAllPublished(limit, page);
      expect(service.findAllPublished).toHaveBeenCalledWith(limit, page);
    });
  });

  describe('findAll', () => {
    it('deve chamar o método findAll do serviço com os parâmetros limit e page corretos', async () => {
      const limit = 10;
      const page = 1;
      await controller.findAll(limit, page);
      expect(service.findAll).toHaveBeenCalledWith(limit, page);
    });
  });

  describe('findOne', () => {
    it('deve chamar o método findOne do serviço com o parâmetro id correto', async () => {
      const id = 1;
      await controller.findOne(id);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('findByQuery', () => {
    it('deve chamar o método findByQuery do serviço com a string de consulta correta', async () => {
      const query = 'test';
      await controller.findByQuery(query);
      expect(service.findByQuery).toHaveBeenCalledWith(query);
    });
  });

  describe('create', () => {
    it('deve chamar o método create do serviço com os parâmetros corretos, incluindo data e valores padrão', async () => {
      const dto = { title: 'Test', content: 'Content' };
      await controller.create(dto);
      expect(service.create).toHaveBeenCalledWith({
        ...dto,
        date: expect.any(Date),
        isPublished: false,
        publishDate: null,
        id: 0,
      });
    });
  });

  describe('update', () => {
    it('deve chamar o método update do serviço com o id e os parâmetros de atualização corretos', async () => {
      const dto = { title: 'Test', content: 'Content', isPublished: false, date: new Date(), publishDate: null };
      const id = 1;
      await controller.update(id, dto);
      expect(service.update).toHaveBeenCalledWith(id, { id, ...dto });
    });
  });

  describe('publish', () => {
    it('deve chamar o método publish do serviço com o id correto', async () => {
      const id = 1;
      await controller.publish(id);
      expect(service.publish).toHaveBeenCalledWith(id);
    });
  });

  describe('remove', () => {
    it('deve chamar o método remove do serviço com o id correto', async () => {
      const id = 1;
      await controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});

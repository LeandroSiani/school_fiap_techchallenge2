import { Test, TestingModule } from '@nestjs/testing';
import { PostControllerController } from './post.controller';

describe('PostControllerController', () => {
  let controller: PostControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostControllerController],
    }).compile();

    controller = module.get<PostControllerController>(PostControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

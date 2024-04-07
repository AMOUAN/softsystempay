import { Test, TestingModule } from '@nestjs/testing';
import { LienController } from './lien.controller';
import { LienService } from './lien.service';

describe('LienController', () => {
  let controller: LienController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LienController],
      providers: [LienService],
    }).compile();

    controller = module.get<LienController>(LienController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { LienService } from './lien.service';

describe('LienService', () => {
  let service: LienService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LienService],
    }).compile();

    service = module.get<LienService>(LienService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

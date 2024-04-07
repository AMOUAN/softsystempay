import { Test, TestingModule } from '@nestjs/testing';
import { GetstatusService } from './getstatus.service';

describe('GetstatusService', () => {
  let service: GetstatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetstatusService],
    }).compile();

    service = module.get<GetstatusService>(GetstatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

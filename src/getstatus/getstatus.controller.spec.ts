import { Test, TestingModule } from '@nestjs/testing';
import { GetstatusController } from './getstatus.controller';
import { GetstatusService } from './getstatus.service';

describe('GetstatusController', () => {
  let controller: GetstatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetstatusController],
      providers: [GetstatusService],
    }).compile();

    controller = module.get<GetstatusController>(GetstatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { WifiService } from './wifi.service';

describe('WifiService', () => {
  let service: WifiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WifiService],
    }).compile();

    service = module.get<WifiService>(WifiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

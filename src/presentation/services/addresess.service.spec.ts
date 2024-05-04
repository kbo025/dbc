import { Test, TestingModule } from '@nestjs/testing';
import { AddresessService } from './addresess.service';

describe('AddresessService', () => {
  let service: AddresessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddresessService],
    }).compile();

    service = module.get<AddresessService>(AddresessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

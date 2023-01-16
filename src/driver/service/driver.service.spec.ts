import { Test, TestingModule } from '@nestjs/testing';
import { DriverService } from './driver.service';

describe('DriverService', () => {
  let service: DriverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DriverService],
    }).compile();

    service = module.get<DriverService>(DriverService);
  });

  it('should return all drivers', async () => {
    const drivers = await service.getDrivers();
    expect.arrayContaining(drivers);
  });
  it('should return all available drivers', async () => {
    const drivers = await service.getAvailableDrivers();
    expect.arrayContaining(drivers);
  });
});

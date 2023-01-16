import { Test, TestingModule } from '@nestjs/testing';
import { TripService } from './trip.service';

describe('TripService', () => {
  let service: TripService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TripService],
    }).compile();

    service = module.get<TripService>(TripService);
  });


  it('should return all trip', async () => {
    const trips = await service.getTrips();
    expect.arrayContaining(trips);
  });
});

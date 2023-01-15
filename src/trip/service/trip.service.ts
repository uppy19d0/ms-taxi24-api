import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trip } from '../entities/trip.entity';
import { Repository } from 'typeorm';
import { CreateTripDTO } from '../dto/trip.dto';
import { Driver } from 'src/driver/entities/driver.entity';
import { Passenger } from 'src/passenger/entities/passenger.entity';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Trip) private tripRepository: Repository<Trip>,
  ) {}

  //all trips activate
  getAllActive(): Promise<Trip[]> {
    let trips = this.tripRepository.find({
      where: { is_complete: true },
      relations: ['driver', 'passenger'],
    });

    return trips;
  }

  //all trips
  getTrips(): Promise<Trip[]> {
    return this.tripRepository.find({
      relations: {
        driver: true,
        passenger: true,
      },
    });
  }

  //trip by id

  findTripID(_id: number): Promise<Trip> {
    const driver = this.tripRepository.findOne({
      where: { id: _id },
      relations: ['driver', 'passenger'],
    });
    return driver;
  }

  // Post a single trip
  async createTrip(
    createTripDto: CreateTripDTO,
    driver: Driver,
    passeger: Passenger,
  ): Promise<Trip> {
    createTripDto.driver = driver;
    createTripDto.passenger = passeger;
    const trip = await this.tripRepository.create(createTripDto);
    return this.tripRepository.save(trip);
  }

  // Put a single Trip
  async updateTrip(TripId: number, trip: Trip): Promise<Trip> {
    const tripUpdate = await this.tripRepository.findOneBy({
      id: TripId,
    });
    this.tripRepository.merge(tripUpdate, trip);
    return this.tripRepository.save(tripUpdate);
  }
}

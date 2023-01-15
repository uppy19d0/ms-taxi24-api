import { Injectable } from '@nestjs/common';
import { Passenger } from '../entities/passenger.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePassengerDTO } from '../dto/passenger.dto';

@Injectable()
export class PassengerService {
  constructor(
    @InjectRepository(Passenger)
    private passengerRepository: Repository<Passenger>,
  ) {}

  getPassengers(): Promise<Passenger[]> {
    return this.passengerRepository.find();
  }

  findPassengerID(_id: number): Promise<Passenger> {
    const passeger = this.passengerRepository.findOneBy({ id: _id });
    return passeger;
  }

  // Post a single Passenger
  async createPassenger(
    createPassengerDTO: CreatePassengerDTO,
  ): Promise<Passenger> {
    const passeger = await this.passengerRepository.create(createPassengerDTO);
    return this.passengerRepository.save(passeger);
  }

  // Delete Passenger
  async deletePassenger(DriverID: string): Promise<any> {
    const deletedPassenger = await this.passengerRepository.delete(DriverID);
    return deletedPassenger;
  }

  // Put a single Passenger
  async updatePassenger(
    DriverID: number,
    createPassengerDTO: CreatePassengerDTO,
  ): Promise<Passenger> {
    const passengerUpdate = await this.passengerRepository.findOneBy({
      id: DriverID,
    });
    this.passengerRepository.merge(passengerUpdate, createPassengerDTO);
    return this.passengerRepository.save(passengerUpdate);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateDriverDTO } from '../dto/driver.dto';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from '../entities/driver.entity';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver) private driverRepository: Repository<Driver>,
  ) {}

  //all drivers available
  getAvailableDrivers(): Promise<Driver[]> {
    let driver = this.driverRepository.find({
      where: [{ is_available: true }],
    });

    return driver;
  }

  //all drivers
  getDrivers(): Promise<Driver[]> {
    return this.driverRepository.find({});
  }

  //driver by id
  findDriverID(_id: number): Promise<Driver> {
    const driver = this.driverRepository.findOneBy({ id: _id });
    return driver;
  }

  // Post a single Driver
  async createDriver(createDriverDTO: CreateDriverDTO): Promise<Driver> {
    const driver = await this.driverRepository.create(createDriverDTO);
    return this.driverRepository.save(driver);
  }

  // Delete Driver
  async deleteDriver(DriverID: string): Promise<any> {
    const deletedDriver = await this.driverRepository.delete(DriverID);
    return deletedDriver;
  }

  // Put a single Driver
  async updateDriver(
    DriverID: number,
    createDriverDTO: CreateDriverDTO,
  ): Promise<Driver> {
    const driverUpdate = await this.driverRepository.findOneBy({
      id: DriverID,
    });

    this.driverRepository.merge(driverUpdate, createDriverDTO);
    return this.driverRepository.save(driverUpdate);
  }
}

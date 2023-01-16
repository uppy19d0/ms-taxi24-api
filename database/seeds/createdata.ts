// import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from 'src/driver/entities/driver.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { Passenger } from 'src/passenger/entities/passenger.entity';
import { Trip } from 'src/trip/entities/trip.entity';
import { Repository } from 'typeorm';

export class DBdata {
  constructor(
    @InjectRepository(Invoice) private invoiceRepository: Repository<Invoice>,
    @InjectRepository(Driver) private driverRepository: Repository<Driver>,
    @InjectRepository(Passenger)
    private passengerRepository: Repository<Passenger>,
    @InjectRepository(Trip) private tripRepository: Repository<Trip>,
  ) {}
  async seend() {
    console.log('Beginning dbseed driver && passenger && trip && invoice.');

    // Create seed data.
    //Driver 1
    let driver = new Driver();
    driver.email = 'test1@grupobabel.com';
    driver.location = '18.485225,-69.865628';
    driver.names = 'test babel';
    driver.is_available = true;
    driver.phone = '9939393993';

    //insert driver 1
    const drivernew = await this.driverRepository.create(driver);
    this.driverRepository.save(drivernew);

    //Driver 2
    let driver2 = new Driver();
    driver2.email = 'test2@grupobabel.com';
    driver2.location = '18.485225,-69.865628';
    driver2.names = 'test babel2';
    driver2.is_available = false;
    driver2.phone = '9939393993';

    //insert driver 2
    const drivernew2 = await this.driverRepository.create(driver2);
    this.driverRepository.save(drivernew2);

    //Passenger 1
    let passenger1 = new Passenger();
    passenger1.email = 'customer1@grupobabel.com';
    passenger1.name = 'test babel1';
    passenger1.phone = '9939393993';

    //insert driver 1
    const passenger1new = await this.passengerRepository.create(passenger1);
    this.passengerRepository.save(passenger1new);

    //Passenger 2
    let passenger2 = new Passenger();
    passenger2.email = 'customer2@grupobabel.com';
    passenger2.name = 'test babel2';
    passenger2.phone = '9939393993';

    //insert Passenger 2
    const passenger2new = await this.passengerRepository.create(passenger2);
    this.passengerRepository.save(passenger2new);

    // const readBackPatient = await patientRepo.findOne({
    //   where: {
    //     id: patientId,
    //   },
    //   relations: {
    //     appointments: {
    //       doctor: true,
    //     },
    //   },
    // });

    // console.log(`\nPatient data with relations read back from PG.`);

    console.log('END SEEDDB.');
  }
}

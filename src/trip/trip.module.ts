import { Module } from '@nestjs/common';
import { TripController } from './controller/trip.controller';
import { TripService } from './service/trip.service';
import { Trip } from './entities/trip.entity';
import { Passenger } from 'src/passenger/entities/passenger.entity';
import { Driver } from 'src/driver/entities/driver.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Helper } from 'src/common/helpers/helpers';
import { DriverService } from 'src/driver/service/driver.service';
import { PassengerService } from 'src/passenger/service/passenger.service';
import { InvoiceService } from 'src/invoice/service/invoice.service';
import { Invoice } from 'src/invoice/entities/invoice.entity';

@Module({
  providers: [
    TripService,
    DriverService,
    PassengerService,
    InvoiceService,
    Helper,
  ],
  controllers: [TripController],
  imports: [TypeOrmModule.forFeature([Trip, Passenger, Driver, Invoice])],
})
export class TripModule {}

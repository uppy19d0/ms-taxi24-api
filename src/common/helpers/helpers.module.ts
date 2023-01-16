import { Module } from '@nestjs/common';
import { Helper } from './helpers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from 'src/trip/entities/trip.entity';
import { Passenger } from 'src/passenger/entities/passenger.entity';
import { Driver } from 'src/driver/entities/driver.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';

@Module({
  providers: [Helper],
  imports: [TypeOrmModule.forFeature([Trip, Passenger, Driver, Invoice])],
})
export class HelperModule {}

import { Module } from '@nestjs/common';
import { PassengerService } from './service/passenger.service';
import { PassengerController } from './controller/passenger.controller';
import { Passenger } from './entities/passenger.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Helper } from '../common/helpers/helpers';
import { DriverService } from '../driver/service/driver.service';
import { Driver } from '../driver/entities/driver.entity';
import { Trip } from '../trip/entities/trip.entity';
import { Invoice } from '../invoice/entities/invoice.entity';

@Module({
  providers: [PassengerService,DriverService,Helper],
  controllers: [PassengerController],
  imports: [TypeOrmModule.forFeature([Passenger,Invoice,Driver,Trip])],
})
export class PassengerModule {}

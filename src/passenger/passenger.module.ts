import { Module } from '@nestjs/common';
import { PassengerService } from './service/passenger.service';
import { PassengerController } from './controller/passenger.controller';
import { Passenger } from './entities/passenger.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Helper } from 'src/common/helpers/helpers';
import { DriverService } from 'src/driver/service/driver.service';
import { Driver } from 'src/driver/entities/driver.entity';
import { Trip } from 'src/trip/entities/trip.entity';

@Module({
  providers: [PassengerService,DriverService,Helper],
  controllers: [PassengerController],
  imports: [TypeOrmModule.forFeature([Passenger,Driver,Trip])],
})
export class PassengerModule {}

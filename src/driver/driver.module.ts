import { Module } from '@nestjs/common';
import { DriverController } from './controller/driver.controller';
import { DriverService } from './service/driver.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';
import { Helper } from 'src/common/helpers/helpers';
import { Trip } from 'src/trip/entities/trip.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Driver,Trip,Invoice])],
  controllers: [DriverController],
  providers: [DriverService,Helper],
})
export class DriverModule {}

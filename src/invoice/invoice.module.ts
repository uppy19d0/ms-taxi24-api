import { Module } from '@nestjs/common';
import { InvoiceService } from './service/invoice.service';
import { InvoiceController } from './controller/invoice.controller';
import { Invoice } from './entities/invoice.entity';
import { Trip } from 'src/trip/entities/trip.entity';
import { Passenger } from 'src/passenger/entities/passenger.entity';
import { Driver } from 'src/driver/entities/driver.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [InvoiceService],
  controllers: [InvoiceController],
  imports: [TypeOrmModule.forFeature([Invoice,Trip, Passenger, Driver])],
})
export class InvoiceModule {}

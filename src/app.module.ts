import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DriverModule } from './driver/driver.module';
import { InvoiceModule } from './invoice/invoice.module';
import { PassengerModule } from './passenger/passenger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripModule } from './trip/trip.module';
import { DatabaseSourceOptions } from '../database/database-source';

@Module({
  imports: [
    DriverModule,
    TripModule,
    InvoiceModule,
    PassengerModule,
    TypeOrmModule.forRoot(DatabaseSourceOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

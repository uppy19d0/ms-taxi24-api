import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DriverModule } from './driver/driver.module';
import { InvoiceModule } from './invoice/invoice.module';
import { DatabaseModule } from './common/database/database.module';
import { PassengerModule } from './passenger/passenger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripModule } from './trip/trip.module';
// import { HelperModule } from './common/helpers/helpers.module';
 
@Module({
  imports: [
    DriverModule,
    TripModule,
    InvoiceModule,
    DatabaseModule,
    PassengerModule,
    TypeOrmModule.forRoot({
    ssl: false,
    type: 'postgres',
    host: 'localhost',
    database: 'taxi24_db',
    username: 'postgres',
    password: 'root',
    port: 5432,
    synchronize: true,
    entities: ['dist/**/*.entity{.ts,.js}']
  })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

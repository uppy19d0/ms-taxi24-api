import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Helper } from 'src/common/helpers/helpers';
import { DriverService } from 'src/driver/service/driver.service';
import { CreateTripDTO } from '../dto/trip.dto';
import { TripService } from '../service/trip.service';
import { Passenger } from 'src/passenger/entities/passenger.entity';
import { PassengerService } from 'src/passenger/service/passenger.service';
import { InvoiceService } from 'src/invoice/service/invoice.service';

@Controller('trip')
export class TripController {
  constructor(
    private tripService: TripService,
    private driverService: DriverService,
    private passengerService: PassengerService,
    private invoiceService:InvoiceService,
    private helpService: Helper,
  ) {}

  @Get('/')
  async getTrips(@Res() res) {
    const trips = await this.tripService.getTrips();
    return res.status(HttpStatus.OK).json(trips);
  }

  @Get('/only/:TripID')
  async getTripsID(@Res() res, @Param('TripID') tripId) {
    const trip = await this.tripService.findTripID(tripId);
    return res.status(HttpStatus.OK).json(trip);
  }

  @Post('/create')
  async createTrip(@Res() res, @Body() createTripDto: CreateTripDTO) {
    const drivers = await this.driverService.getAvailableDrivers();
    const passeger = await this.passengerService.findPassengerID(
      createTripDto.passengerId,
    );
    try {
      if (drivers[0] != null) {
        let driver = drivers[0];
        const trip = await this.tripService.createTrip(
          createTripDto,
          driver,
          passeger,
        );
        await this.driverService.updateDriver(driver.id, driver);
        return res.status(HttpStatus.OK).json({
          message: 'Trip created successfully',
          trip,
          status: 200,
        });
      }
      return res.status(HttpStatus.OK).json({
        message: 'Trip no can created because No found drivers',
        status: HttpStatus.NOT_FOUND,
      });
    } catch (_error) {
      console.log('ERROR' + _error);
    }
  }

  @Get('/all_activate')
  async getTripsActivate(@Res() res) {
    const trips = await this.tripService.getAllActive();
    return res.status(HttpStatus.OK).json(trips);
  }
  @Post('/complete/:TripID')
  async completeTrip(@Req() req, @Res() res, @Param('TripID') tripId) {
    let trip = await this.tripService.findTripID(tripId);
    if (trip.is_complete) {
      return res
        .status(HttpStatus.CONFLICT)
        .json({ message: 'Trip already completed!' });
    }
    trip.is_complete = true;
    trip = await this.tripService.updateTrip(tripId, trip);

    let driver = await this.driverService.findDriverID(trip.driver.id);
    driver.is_available = true;
    await this.driverService.updateDriver(driver.id, driver);

    const { lon: lon1, lat: lat1 } = this.helpService.getCoordinates(
      trip.departure,
    );
    const { lon: lon2, lat: lat2 } = this.helpService.getCoordinates(
      trip.destination,
    );

    const distance = this.helpService.calculateDistance(lat1, lon1, lat2, lon2);

    const invoice = await this.invoiceService.create({
      trip: trip,
      passenger: trip.passenger,
      driver: trip.driver,
      cost: distance * 100,
    });

    return res.status(HttpStatus.OK).json({
      message: 'Trip completed successfully',
      trip: trip,
      invoice: invoice,
    });
  }
}

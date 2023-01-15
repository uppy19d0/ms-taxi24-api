import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { PassengerService } from '../service/passenger.service';
import { CreatePassengerDTO } from '../dto/passenger.dto';
import { Helper } from 'src/common/helpers/helpers';
import { DriverService } from 'src/driver/service/driver.service';

@Controller('passenger')
export class PassengerController {
  constructor(
    private passengerService: PassengerService,
    private driverService: DriverService,
    private helpService: Helper,
  ) {}

  // Add Driver: /passenger/create
  @Post('/create')
  async createDriver(
    @Res() res,
    @Body() createPassengerDto: CreatePassengerDTO,
  ) {
    const driver = await this.passengerService.createPassenger(
      createPassengerDto,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Passenger Successfully Created',
      driver,
      status: 200,
    });
  }

  // List Closest Drivers: /passenger/request/ClosestDrivers
  @Get('/request/ClosestDrivers')
  async getClosestDrivers(@Req() req, @Res() res) {
    const drivers = await this.driverService.getAvailableDrivers();
    const { myLocation, range } = req.query;
    const driversDistance = [];
    drivers.map((driver) => {
      const { lon: lon1, lat: lat1 } =
        this.helpService.getCoordinates(myLocation);
      const { lon: lon2, lat: lat2 } = this.helpService.getCoordinates(
        driver.location,
      );
      const distance = this.helpService.calculateDistance(
        lat1,
        lon1,
        lat2,
        lon2,
      );
      driver['distance'] = distance;
      driversDistance.push(driver);
    });
    const closest = this.helpService
      .arraySorter(driversDistance)
      .slice(0, range || 3);
    return closest.length < 1
      ? res.status(HttpStatus.NOT_FOUND).json({
          message: 'No closest drivers around!',
          options:
            'add <range> in url query parameter to increase the threshold',
        })
      : res.status(HttpStatus.OK).json(closest);
  }

  // Get passenger
  @Get('/')
  async getPassenger(@Res() res) {
    const drivers = await this.passengerService.getPassengers();
    return res.status(HttpStatus.OK).json(drivers);
  }

  // GET single Driver:/passenger/{id}
  @Get('/:PassengerID')
  async getDriver(@Res() res, @Param('PassengerID') passengerId) {
    const driver = await this.passengerService.findPassengerID(passengerId);
    if (!driver) throw new NotFoundException('Passenger does not exist!');
    return res.status(HttpStatus.OK).json(driver);
  }

  // Delete Driver: passenger/delete/{passengerID}
  @Delete('/delete/:PassengerID')
  async deleteDriver(@Res() res, @Param('PassengerID') passengerId) {
    const passengerDeleted = await this.passengerService.deletePassenger(
      passengerId,
    );
    if (!passengerDeleted)
      throw new NotFoundException('Passenger does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Driver Deleted Successfully',
      passengerDeleted,
    });
  }

  // Update Driver: driver/update/{PassengerID}
  @Put('/update/:PassengerID')
  async updateProduct(
    @Res() res,
    @Body() createPassengerDto: CreatePassengerDTO,
    @Param('PassengerID') passengerId,
  ) {
    const updatedProduct = await this.passengerService.updatePassenger(
      passengerId,
      createPassengerDto,
    );
    if (!updatedProduct)
      throw new NotFoundException('Passenger does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Passenger Updated Successfully',
      updatedProduct,
    });
  }
}

import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import {
  Body,
  Param,
  Query,
  Req,
} from '@nestjs/common/decorators/http/route-params.decorator';
import { CreateDriverDTO } from '../dto/driver.dto';
import { DriverService } from '../service/driver.service';
import { Helper } from 'src/common/helpers/helpers';

@Controller('driver')
export class DriverController {
  constructor(
    private driverService: DriverService,
    private helpService: Helper,
  ) {}

  // Add Driver: /driver/create
  @Post('/create')
  async createDriver(@Res() res, @Body() createDriverDTO: CreateDriverDTO) {
    const driver = await this.driverService.createDriver(createDriverDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Driver Successfully Created',
      driver,
      status: 200,
    });
  }

  // Get driver
  @Get('/')
  async getDrivers(@Res() res) {
    const drivers = await this.driverService.getDrivers();
    return res.status(HttpStatus.OK).json(drivers);
  }

  // Get driver available
  @Get('/available')
  async getDriversAvailable(@Res() res) {
    const drivers = await this.driverService.getAvailableDrivers();
    if (drivers.length < 1) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'No available drivers!' });
    }
    return res.status(HttpStatus.OK).json(drivers);
  }

  //Get driver ranger 3 km
  @Get('/available/range')
  async getAvailableDriversWithInRange(@Req() req, @Res() res) {
    const driver = await this.driverService.getAvailableDrivers();
    const { myLocation, range } = req.query;
    const ridersLocation = myLocation.split(',');
    let driversWithInRange = [];

    driver.forEach((driver) => {
      const location = driver.location.split(',');
      const distance = this.helpService.calculateDistance(
        location[0],
        location[1],
        ridersLocation[0],
        ridersLocation[1],
      );
      if (distance <= (range || 3)) {
        driversWithInRange.push({ driver, driverRange: `${distance} KM` });
      }
    });
    return driversWithInRange.length < 1
      ? res.status(HttpStatus.OK).json({
          message: 'No drivers within 3 KM',
          options: 'user <range> query parameter to increase the range',
        })
      : res.status(HttpStatus.OK).json(driversWithInRange);
  }

  // GET single Driver:/driver/{id}
  @Get('/:DriverID')
  async getDriver(@Res() res, @Param('DriverID') driverId) {
    const driver = await this.driverService.findDriverID(driverId);
    if (!driver) throw new NotFoundException('Driver does not exist!');
    return res.status(HttpStatus.OK).json(driver);
  }

  // Delete Driver: driver/delete/{driverID}
  @Delete('/delete/:DriverID')
  async deleteDriver(@Res() res, @Param('DriverID') driverId) {
    const driverDeleted = await this.driverService.deleteDriver(driverId);
    if (!driverDeleted) throw new NotFoundException('Driver does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Driver Deleted Successfully',
      driverDeleted,
    });
  }

  // Update Driver: driver/update/{driverID}
  @Put('/update/:DriverID')
  async updateProduct(
    @Res() res,
    @Body() CreateDriverDTO: CreateDriverDTO,
    @Param('DriverID') driverId,
  ) {
    const updatedProduct = await this.driverService.updateDriver(
      driverId,
      CreateDriverDTO,
    );
    if (!updatedProduct) throw new NotFoundException('Driver does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Driver Updated Successfully',
      updatedProduct,
    });
  }
}

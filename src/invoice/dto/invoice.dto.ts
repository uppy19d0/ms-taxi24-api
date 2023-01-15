import { Driver } from "src/driver/entities/driver.entity";
import { Passenger } from "src/passenger/entities/passenger.entity";
import { Trip } from "src/trip/entities/trip.entity";

export class CreateInvoiceDTO {
  readonly trip: Trip;
  readonly passenger: Passenger;
  readonly driver: Driver;
  readonly cost: number;
}

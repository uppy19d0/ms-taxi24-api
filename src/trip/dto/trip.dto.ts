import { Driver } from "src/driver/entities/driver.entity";
import { Passenger } from "src/passenger/entities/passenger.entity";

export class CreateTripDTO {
  readonly departure: string;
  readonly destination: string;
  readonly is_complete: boolean;
  readonly passengerId: number;
  passenger: Passenger;
  driver: Driver;
}
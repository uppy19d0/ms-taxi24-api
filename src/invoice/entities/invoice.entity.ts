import { Driver } from 'src/driver/entities/driver.entity';
import { Passenger } from 'src/passenger/entities/passenger.entity';
import { Trip } from 'src/trip/entities/trip.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('invoice')
export class Invoice extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  cost: number;

  @ManyToOne(() => Driver, (driver) => driver.invoice)
  @JoinColumn({ name: 'driver_id' })
  driver: Driver;

  @ManyToOne(() => Passenger, (passeger) => passeger.invoice)
  @JoinColumn({ name: 'passenger_id' })
  passenger: Passenger;

  @ManyToOne(() => Trip, (trip) => trip.invoice)
  @JoinColumn({ name: 'trip_id' })
  trip: Trip;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}

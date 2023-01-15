import { Driver } from 'src/driver/entities/driver.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { Passenger } from 'src/passenger/entities/passenger.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// departure VARCHAR(25),
// destination VARCHAR(25),
// is_complete BOOLEAN,
// rider_id integer REFERENCES riders (id),
// driver_id integer REFERENCES drivers (id)

@Entity('trip')
export class Trip extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 150 })
  departure: string;

  @Column({ type: 'text' })
  destination: string;

  @Column()
  is_complete: boolean;

  @ManyToOne(() => Driver, (driver) => driver.trip)
  driver: Driver;

  @ManyToOne(() => Passenger, (passeger) => passeger.trip)
  passenger: Passenger;

  @OneToMany(() => Invoice, (invoice) => invoice.trip)
  public invoice: Invoice[];


  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}

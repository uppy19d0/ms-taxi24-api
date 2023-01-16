import { Invoice } from '../../invoice/entities/invoice.entity';
import { Trip } from '../../trip/entities/trip.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('passenger')
export class Passenger extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'text' })
  phone: string;

  @Column()
  email: string;

  @OneToMany(() => Trip, (trip) => trip.passenger)
  @JoinColumn({ name: 'passengerId' })
  public trip!: Trip[];

  @OneToMany(() => Invoice, (invoice) => invoice.passenger)
  public invoice: Invoice[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}

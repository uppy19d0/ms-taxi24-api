import { Invoice } from 'src/invoice/entities/invoice.entity';
import { Trip } from 'src/trip/entities/trip.entity';
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

@Entity('driver')
export class Driver extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 150 })
  names: string;

  @Column({ type: 'text' })
  phone: string;

  @Column()
  email: string;

  @Column()
  location: string;

  @Column()
  is_available: boolean;

  @OneToMany(() => Trip, (trip) => trip.driver)
  public trip!: Trip[];

  @OneToMany(() => Invoice, (invoice) => invoice.driver)
  public invoice: Invoice[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}

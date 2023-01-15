import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from '../entities/invoice.entity';
import { Repository } from 'typeorm';
import { CreateInvoiceDTO } from '../dto/invoice.dto';
import { Driver } from 'src/driver/entities/driver.entity';
import { Trip } from 'src/trip/entities/trip.entity';
import { Passenger } from 'src/passenger/entities/passenger.entity';
import { DriverController } from 'src/driver/controller/driver.controller';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice) private invoiceRepository: Repository<Invoice>,
    @InjectRepository(Driver) private driverRepository: Repository<DriverController>,
    @InjectRepository(Passenger) private passengerRepository: Repository<Passenger>,
    @InjectRepository(Trip) private tripRepository: Repository<Trip>
  ) {}

  // Post a single Invoice
  async create(createInvoiceDTO: CreateInvoiceDTO): Promise<Invoice> {
    
    const invoice = await this.invoiceRepository.create(createInvoiceDTO);
    return this.invoiceRepository.save(invoice);
  }

  //all invoices
  getAll(): Promise<Invoice[]> {
    return this.invoiceRepository.find({
      relations: {
        driver: true,
        passenger: true,
        trip: true,
      },
    });
  }
}

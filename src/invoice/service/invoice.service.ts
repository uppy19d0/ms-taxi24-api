import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from '../entities/invoice.entity';
import { Repository } from 'typeorm';
import { CreateInvoiceDTO } from '../dto/invoice.dto';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice) private invoiceRepository: Repository<Invoice>
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

import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { Helper } from 'src/common/helpers/helpers';
import { InvoiceService } from '../service/invoice.service';

@Controller('invoice')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @Get('/')
  async getAllInvoices(@Req() req, @Res() res) {
    const invoices = await this.invoiceService.getAll();
    return invoices.length < 1
      ? res.status(HttpStatus.NOT_FOUND).json({
          message: 'No invoices found!',
        })
      : res.status(HttpStatus.OK).json(invoices);
  }
}

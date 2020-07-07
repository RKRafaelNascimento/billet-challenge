import { Controller, Post, Body } from '@nestjs/common';
import { IBarCodeInformation } from '../interfaces/IBarCodeInformation.interface';
import { BilletService } from '../services/Billet.service';

@Controller('/billet')
export class BilletController {
  constructor(private readonly billetService: BilletService) {}

  @Post('/information')
  getBarCodeInformation(@Body('typedLine') typedLine: string): IBarCodeInformation {
    return this.billetService.getBarCodeInformation(typedLine);
  }
}

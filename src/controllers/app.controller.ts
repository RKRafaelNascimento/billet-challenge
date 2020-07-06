import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { BankingSecuritiesService } from 'src/services/BankingSecurities.service';
import { IBarCodeInformation } from 'src/interfaces/IBarCodeInformation.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: BankingSecuritiesService) {}

  @Post()
  getBarCodeInformation(@Body('typedLine') typedLine: string): IBarCodeInformation {
    return this.appService.getBarCodeInformation(typedLine);
  }
}

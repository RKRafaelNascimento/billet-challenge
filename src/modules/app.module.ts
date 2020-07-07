import { Module } from '@nestjs/common';
import { BilletController } from 'src/controllers/Billet.controller';
import { BankingSecuritiesService } from 'src/services/BankingSecurities.service';
import { ConcessionaryPaymentsService } from 'src/services/ConcessionaryPayments.service';
import { ModuleCalculationService } from 'src/services/ModuleCalculation.service';
import { BilletService } from 'src/services/Billet.service';

@Module({
  imports: [],
  controllers: [BilletController],
  providers: [
    BankingSecuritiesService,
    ConcessionaryPaymentsService,
    ModuleCalculationService,
    BilletService,
  ],
})
export class AppModule {}

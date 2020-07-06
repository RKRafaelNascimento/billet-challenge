import { Module } from '@nestjs/common';
import { AppController } from 'src/controllers/app.controller';
import { AppService } from 'src/services/app.service';
import { BankingSecuritiesService } from 'src/services/BankingSecurities.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, BankingSecuritiesService],
})
export class AppModule {}

import { Injectable } from '@nestjs/common';
import { IBarCodeInformation } from '../interfaces/IBarCodeInformation.interface';
import { BankingSecuritiesService } from './BankingSecurities.service';
import { ConcessionaryPaymentsService } from './ConcessionaryPayments.service';
import { IBillet } from '../interfaces/enums/IBillet.interface';

@Injectable()
export class BilletService {
    constructor(private readonly bankingSecuritiesService: BankingSecuritiesService,
                private readonly concessionaryPaymentsService: ConcessionaryPaymentsService) {}

    getBarCodeInformation(typedLine: string): IBarCodeInformation {
        if (typedLine[0] === IBillet.CONCESSIONARY_PAYMENTS) {
            return this.concessionaryPaymentsService.getBarCodeInformation(typedLine);
        }
        return this.bankingSecuritiesService.getBarCodeInformation(typedLine);
    }
}

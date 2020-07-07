import { BilletService } from '../../src/services/Billet.service';
import { Test } from '@nestjs/testing';
import { ModuleCalculationService } from '../../src/services/ModuleCalculation.service';
import { ConcessionaryPaymentsService } from '../../src/services/ConcessionaryPayments.service';
import { BankingSecuritiesService } from '../../src/services/BankingSecurities.service';

const typedLineValidBanking: string =  '34191.09008 01011.090444 00961.620002 7 81850000132609';
const typedLineValidConcessionary: string =  '83610000001-4 22620138000-4 61092887011-8 08035071052-3';

const responseBanking = {
    typedLineValid: true,
    value: 'R$1.326.09',
    dueDate: '05/03/2020',
    barcode: '34197818500001326091090001011090440096162000',
};

const responseConcessionary = {
    typedLineValid: true,
    value: 'R$122.62',
    dueDate: null,
    barcode: '83610000001226201380006109288701108035071052',
  };

describe('BilletService', () => {
    let billetService: BilletService;
    beforeEach(async () => {
        const testingModule = await Test.createTestingModule({
          providers: [
            ModuleCalculationService,
            ConcessionaryPaymentsService,
            BankingSecuritiesService,
            BilletService,
          ],
        }).compile();

        billetService = testingModule.get(BilletService);
    });
    describe('Method getBarCodeInformation', () => {
        it('should return bank title information', () => {
            const response = billetService.getBarCodeInformation(typedLineValidBanking);

            expect(response).toMatchObject(responseBanking);
        }),
        it('should return dealership payments information', () => {
            const response = billetService.getBarCodeInformation(typedLineValidConcessionary);

            expect(response).toMatchObject(responseConcessionary);
        });
    });
});

import { Test, TestingModule } from '@nestjs/testing';
import { BilletController  } from '../../src/controllers/Billet.controller';
import { BilletService } from '../../src/services/Billet.service';
import { ModuleCalculationService } from '../../src/services/ModuleCalculation.service';
import { ConcessionaryPaymentsService } from '../../src/services/ConcessionaryPayments.service';
import { BankingSecuritiesService } from '../../src/services/BankingSecurities.service';

const typedLineValid: string =  '83610000001-4 22620138000-4 61092887011-8 08035071052-3';

const responseConcessionary = {
    typedLineValid: true,
    value: 'R$122.62',
    dueDate: null,
    barcode: '83610000001226201380006109288701108035071052',
  };

describe('AppController', () => {
  let billetController: BilletController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BilletController],
      providers: [
        ModuleCalculationService,
        ConcessionaryPaymentsService,
        BankingSecuritiesService,
        BilletService,
        ],
    }).compile();

    billetController = app.get<BilletController>(BilletController);
  });

  describe('Billet Controller', () => {
    it('should return dealership payments information', () => {
      expect(billetController.getBarCodeInformation(typedLineValid)).toMatchObject(responseConcessionary);
    });
  });
});

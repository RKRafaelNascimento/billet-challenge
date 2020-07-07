import { ModuleCalculationService } from '../../src/services/ModuleCalculation.service';

const blocks = [
    { num: '83610000001', DV: '4' },
    { num: '22620138000', DV: '4' },
    { num: '61092887011', DV: '8' },
    { num: '08035071052', DV: '3' },
  ];

const barCodeFortyFour = '34197818500001326091090001011090440096162000';

describe('ModuleCalculationService', () => {
    const moduleCalculationService = new ModuleCalculationService();
    describe('Method calculateModuleTen', () => {
        it('should return the currect DV', () => {

            expect(String(moduleCalculationService.calculateModuleTen(blocks[0].num))).toEqual(String(blocks[0].DV));
        });
    }),
    describe('Method calculateModuleEleven', () => {
        it('should return the currect DV', () => {
            const DV = barCodeFortyFour[4];
            const block = barCodeFortyFour.slice(0, 4) + barCodeFortyFour.slice(5);
            const isValid = moduleCalculationService.calculateModuleEleven(block) === Number(DV);

            expect(isValid).toBe(true);
        });
    }),
    describe('Method calculateModuleElevenConcessionary', () => {
        it('should return the currect DV', () => {
            const barCode = '85860000029264603281507901071507206389624402';
            const DV = barCode[3];
            const block = barCode.slice(0, 3) + barCode.slice(4);
            const isValid = moduleCalculationService.calculateModuleElevenConcessionary(block) === Number(DV);

            expect(isValid).toBe(true);
        });
    });
});

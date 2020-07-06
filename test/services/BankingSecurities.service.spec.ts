import { BankingSecuritiesService } from '../../src/services/BankingSecurities.service';
import { IBarCodeInformation } from '../../src/interfaces/IBarCodeInformation.interface';

class BankingSecuritiesTeste extends BankingSecuritiesService {

    public isCorrectFormatTest(typedLine: string): boolean {
       return this.isCorrectFormat(typedLine);
    }

    public isValidCheckDigitsTest(barcode: string): boolean {
        return this.isValidCheckDigits(barcode);
    }

    public getBarCodeInformationTest(typedLine: string): IBarCodeInformation {
        return this.getBarCodeInformation(typedLine);
    }

    public getBlocksByBarCodeTest(barcode: string): Array<{num: string, DV: string}> {
        return this.getBlocksByBarCode(barcode);
    }

    public calculateModuleTenTest(block: string): number {
        return this.calculateModuleTen(block);
    }

    public calculateModuleElevenTest(barcode: string): number {
        return this.calculateModuleEleven(barcode);
    }

    public convertBarCodeTest(barcode: string): string {
        return this.convertBarCode(barcode);
    }

    public getDueDateInBarCodeTest(barcode: string): string {
        return this.getDueDateInBarCode(barcode);
    }

    public getValueInBarCodeTest(barcode: string): string {
        return this.getValueInBarCode(barcode);
    }
}
const typedLineValid: string =  '34191.09008 01011.090444 00961.620002 7 81850000132609';
const typedLineInvalid: string = '34191.090081 01011.090444 00961.620002 7 81850000132609';
const barcodeValid: string = '34191090080101109044400961620002781850000132609';
const barcodeInvalid: string = '341910900810101109044400961620002781850000132609';
const response = {
    typedLineValid: true,
    value: 'R$1.326.09',
    dueDate: '05/03/2020',
    barcode: '34197818500001326091090001011090440096162000',
  };
const blocks = [
    { num: '341910900', DV: '8' },
    { num: '0101109044', DV: '4' },
    { num: '0096162000', DV: '2' },
];

const barCodeFortyFour = '34197818500001326091090001011090440096162000';

describe('BankingSecuritiesService', () => {
    const bankingSecuritiesTeste = new BankingSecuritiesTeste();
    describe('Method isCorrectFormat', () => {
        it('should return true for typed line valid', () => {
        expect(bankingSecuritiesTeste.isCorrectFormatTest(typedLineValid)).toBe(true);
        }),
        it('should return false for typed line invalid', () => {

            expect(bankingSecuritiesTeste.isCorrectFormatTest(typedLineInvalid)).toBe(false);
        });
    }),
    describe('Method getBarCodeInformationTest', () => {
        it('should return the correct information regarding the barcode', () => {

        expect(String(bankingSecuritiesTeste.getBarCodeInformation(typedLineValid))).toEqual(String(response));
        });
    });
    describe('Method isValidCheckDigits', () => {
        it('should return true for barcode valid', () => {

        expect(bankingSecuritiesTeste.isValidCheckDigitsTest(barcodeValid)).toBe(true);
        }),
        it('should return false for barcode invalid', () => {

            expect(bankingSecuritiesTeste.isValidCheckDigitsTest(barcodeInvalid)).toBe(false);
        });
    }),
    describe('Method getBlocksByBarCode', () => {
        it('should return the first three blocks', () => {

            expect(String(bankingSecuritiesTeste.getBlocksByBarCodeTest(barcodeValid))).toEqual(String(blocks));
        });
    }),
    describe('Method calculateModuleTen', () => {
        it('should return the currect DV', () => {

            const result = bankingSecuritiesTeste.getBlocksByBarCodeTest(barcodeValid);
            expect(String(bankingSecuritiesTeste.calculateModuleTenTest(result[0].num))).toEqual(String(result[0].DV));
        });
    }),
    describe('Method calculateModuleEleven', () => {
        it('should return the currect DV', () => {
            const barCodeByFortyFour = bankingSecuritiesTeste.convertBarCodeTest(barcodeValid);
            const DV = barCodeByFortyFour[4];
            const block = barCodeByFortyFour.slice(0, 4) + barCodeByFortyFour.slice(5);
            const isValid = bankingSecuritiesTeste.calculateModuleElevenTest(block) === Number(DV);

            expect(isValid).toBe(true);
        });
    }),
    describe('Method convertBarCode', () => {
        it('should return the forty-four digit barcode', () => {
            expect(bankingSecuritiesTeste.convertBarCodeTest(barcodeValid)).toEqual(barCodeFortyFour);
        });
    }),
    describe('Method getDueDateInBarCodeTest', () => {
        it('should return the expiration date of the barcode', () => {
            expect(bankingSecuritiesTeste.getDueDateInBarCodeTest(barcodeValid)).toEqual(response.dueDate);
        });
    }),
    describe('Method getValueInBarCodeTest', () => {
        it('should return the value specifed in the barcode', () => {
            expect(bankingSecuritiesTeste.getValueInBarCodeTest(barcodeValid)).toEqual(response.value);
        });
    });
});

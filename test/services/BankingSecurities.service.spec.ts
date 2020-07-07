import BankingSecuritiesTest from '../../src/shared/testClasses/BankingSecuritiesTest';

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
    const bankingSecuritiesTest = BankingSecuritiesTest;
    describe('Method isCorrectFormat', () => {
        it('should return true for typed line valid', () => {

        expect(bankingSecuritiesTest.isCorrectFormatTest(typedLineValid)).toBe(true);
        }),
        it('should return false for typed line invalid', () => {

        expect(bankingSecuritiesTest.isCorrectFormatTest(typedLineInvalid)).toBe(false);
        });
    }),
    describe('Method getBarCodeInformationTest', () => {
        it('should return the correct information regarding the barcode', () => {
        expect(bankingSecuritiesTest.getBarCodeInformation(typedLineValid)).toMatchObject(response);
        });
    });
    describe('Method isValidCheckDigits', () => {
        it('should return true for barcode valid', () => {

        expect(bankingSecuritiesTest.isValidCheckDigitsTest(barcodeValid)).toBe(true);
        }),
        it('should return false for barcode invalid', () => {

            expect(bankingSecuritiesTest.isValidCheckDigitsTest(barcodeInvalid)).toBe(false);
        });
    }),
    describe('Method getBlocksByBarCode', () => {
        it('should return the first three blocks', () => {
            expect(bankingSecuritiesTest.getBlocksByBarCodeTest(barcodeValid)).toMatchObject(blocks);
        });
    }),
    describe('Method convertBarCode', () => {
        it('should return the forty-four digit barcode', () => {
            expect(bankingSecuritiesTest.convertBarCodeTest(barcodeValid)).toEqual(barCodeFortyFour);
        });
    }),
    describe('Method getDueDateInBarCodeTest', () => {
        it('should return the expiration date of the barcode', () => {
            expect(bankingSecuritiesTest.getDueDateInBarCodeTest(barcodeValid)).toEqual(response.dueDate);
        }),
        it('should return null values ​​above 9999999999', () => {
            const barcode = '34191090080101109044400961620002781859999999999';
            expect(bankingSecuritiesTest.getDueDateInBarCodeTest(barcode)).toBeNull();
        });
    }),
    describe('Method getValueInBarCodeTest', () => {
        it('should return the value specifed in the barcode', () => {
            expect(bankingSecuritiesTest.getValueInBarCodeTest(barcodeValid)).toEqual(response.value);
        }),
        it('should advance on the “Winning Factor”', () => {
            const barcode = '34191090080101109044400961620002781859999999999';
            const value = 'R$818.599,999,999.99';
            expect(bankingSecuritiesTest.getValueInBarCodeTest(barcode)).toEqual(value);
        });
    });
});

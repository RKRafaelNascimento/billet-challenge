import ConcessionaryPaymentsTest from '../../src/shared/testClasses/ConcessionaryPaymentsTest';

const typedLineValid: string =  '83610000001-4 22620138000-4 61092887011-8 08035071052-3';
const typedLineInvalid: string = '83610000001-4 226201380120-4 61092887011-8 08035071052-3';
const barCodeValid: string = '836100000014226201380004610928870118080350710523';
const barCodeInvalid: string = '836100000012262013801204610928870118080350710523';
const response = {
    typedLineValid: true,
    value: 'R$122.62',
    dueDate: null,
    barcode: '83610000001226201380006109288701108035071052',
  };
const blocks = [
    { num: '83610000001', DV: '4' },
    { num: '22620138000', DV: '4' },
    { num: '61092887011', DV: '8' },
    { num: '08035071052', DV: '3' },
  ];

const barCodeFortyFour = '83610000001226201380006109288701108035071052';

describe('ConcessionaryPayments', () => {
    const concessionaryPaymentsTest = ConcessionaryPaymentsTest;
    describe('Method isCorrectFormat', () => {
        it('should return true for typed line valid', () => {
        expect(concessionaryPaymentsTest.isCorrectFormatTest(typedLineValid)).toBe(true);
        }),
        it('should return false for typed line invalid', () => {

            expect(concessionaryPaymentsTest.isCorrectFormatTest(typedLineInvalid)).toBe(false);
        });
    }),
    describe('Method getBarCodeInformationTest', () => {
        it('should return the correct information regarding the barcode', () => {

        expect(concessionaryPaymentsTest.getBarCodeInformation(typedLineValid)).toMatchObject(response);
        });
    });
    describe('Method isValidCheckDigits', () => {
        it('should return true for barcode valid', () => {

        expect(concessionaryPaymentsTest.isValidCheckDigitsTest(barCodeValid)).toBe(true);
        }),
        it('should return false for barcode invalid', () => {

            expect(concessionaryPaymentsTest.isValidCheckDigitsTest(barCodeInvalid)).toBe(false);
        });
    }),
    describe('Method getBlocksByBarCode', () => {
        it('should return the first three blocks', () => {

            expect(concessionaryPaymentsTest.getBlocksByBarCodeTest(barCodeValid)).toMatchObject(blocks);
        });
    }),
    describe('Method convertBarCode', () => {
        it('should return the forty-four digit barcode', () => {
            expect(concessionaryPaymentsTest.convertBarCodeTest(barCodeValid)).toEqual(barCodeFortyFour);
        });
    }),
    describe('Method getDueDateInBarCodeTest', () => {
        it('should return the expiration date of the barcode', () => {
            expect(concessionaryPaymentsTest.getDueDateInBarCodeTest(barCodeValid)).toEqual(response.dueDate);
        });
    }),
    describe('Method getValueInBarCodeTest', () => {
        it('should return the value specifed in the barcode', () => {
            expect(concessionaryPaymentsTest.getValueInBarCodeTest(barCodeFortyFour)).toEqual(response.value);
        });
    });
});

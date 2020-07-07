import { clearMask, getBarCodeSnippet, isEvenNumber } from '../../src/shared/conditions';

const typedLine: string =  '34191.09008 01011.090444 00961.620002 7 81850000132609';
const barcode: string = '34191090080101109044400961620002781850000132609';

describe('File Conditions', () => {
    describe('Method clearMask', () => {
        it('should return barcode without space and special characters', () => {
          expect(clearMask(typedLine)).toEqual(barcode);
        });
    }),
    describe('Method getBarCodeSnippet', () => {
        it('should return the specified barcode snippet', () => {
            const dueDate = '8185';
            const EXPIRATION_FACTOR = {start: 33 , end: 37};
            expect(getBarCodeSnippet(barcode, EXPIRATION_FACTOR.start, EXPIRATION_FACTOR.end)).toEqual(dueDate);
        });
    }),
    describe('Method isEvenNumber', () => {
        it('should return true for even number', () => {
            const number = 10;
            expect(isEvenNumber(number)).toBe(true);
        }),
        it('should return false for odd number', () => {
            const number = 17;
            expect(isEvenNumber(number)).toBe(false);
        });
    });
});

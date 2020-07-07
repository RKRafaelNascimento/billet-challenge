import { IBarCodeInformation } from 'src/interfaces/IBarCodeInformation.interface';

export abstract class AbstractBarCode {
    public abstract  getBarCodeInformation(typedLine: string): IBarCodeInformation;
    protected abstract isCorrectFormat(typedLine: string): boolean
    protected abstract isValidCheckDigits(barcode: string): boolean;
    protected abstract convertBarCode(barcode: string): string;
    protected abstract getValueInBarCode(barcode: string);
    protected abstract getDueDateInBarCode(barcode: string): string;
}

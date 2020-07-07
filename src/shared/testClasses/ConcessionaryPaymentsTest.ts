import { ModuleCalculationService } from '../../services/ModuleCalculation.service';
import { IBarCodeInformation } from '../../interfaces/IBarCodeInformation.interface';
import { ConcessionaryPaymentsService } from '../../services/ConcessionaryPayments.service';

class ConcessionaryPaymentsTest extends ConcessionaryPaymentsService {

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

export default new ConcessionaryPaymentsTest(new ModuleCalculationService());

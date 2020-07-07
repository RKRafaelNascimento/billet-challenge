import { Injectable } from '@nestjs/common';
import { AbstractBarCode } from '../abstracts/AbstractBarCode';
import { IBarCodeInformation } from '../interfaces/IBarCodeInformation.interface';
import { PATTERNS, CONFIG_BANKING } from '../shared/constants';
import { clearMask, getBarCodeSnippet } from '../shared/conditions';
import { InvalidVerifiedDigit } from '../shared/expections/InvalidVerifiedDigit';
import * as moment from 'moment';
import { ModuleCalculationService } from './ModuleCalculation.service';
@Injectable()
export class BankingSecuritiesService extends AbstractBarCode {

    constructor(private readonly moduleService: ModuleCalculationService) {
        super();
    }

    protected isCorrectFormat(typedLine: string): boolean {
        return !!typedLine.match(PATTERNS.BANKING_SECURITIES);
    }

    protected isValidCheckDigits(barcode: string): boolean {
        const blocks = this.getBlocksByBarCode(barcode);
        const isModuleTenValid = blocks.every(sequence => this.moduleService.calculateModuleTen(sequence.num) === Number(sequence.DV));

        const barCodeByFortyFour = this.convertBarCode(barcode);
        const DV = barCodeByFortyFour[4];
        const block = barCodeByFortyFour.slice(0, 4) + barCodeByFortyFour.slice(5);

        return isModuleTenValid && (this.moduleService.calculateModuleEleven(block) === Number(DV));
    }

    public getBarCodeInformation(typedLine: string): IBarCodeInformation {
        const barcode = clearMask(typedLine);

        if (!this.isValidCheckDigits(barcode)) {
            throw new InvalidVerifiedDigit(`Dígito verificador inválido: ${typedLine}`);
        }

        const isValid = this.isCorrectFormat(typedLine);
        const notFound = null;
        return {
            typedLineValid: isValid,
            value: isValid ? this.getValueInBarCode(barcode) : notFound ,
            dueDate: isValid ? this.getDueDateInBarCode(barcode) : notFound ,
            barcode: isValid ? this.convertBarCode(barcode) : notFound ,
        };
    }

    protected getBlocksByBarCode(barcode: string): Array<{num: string, DV: string}> {
        const {  BLOCKS  } = CONFIG_BANKING;

        const blocks =  Object.values(BLOCKS).map((block) => {
            return {
                num: getBarCodeSnippet(barcode, block.start, block.end),
                DV: getBarCodeSnippet(barcode, block.end, (block.end + 1)),
            };
        });

        return blocks;
    }

    protected convertBarCode(barcode: string): string {
        const { BARCODE_FORTY_FOURS } = CONFIG_BANKING;

        const barCodeByFortyFour = Object.values(BARCODE_FORTY_FOURS).reduce((acc, current) => {
          return acc + getBarCodeSnippet(barcode, current.start, current.end);
        }, '');

        return barCodeByFortyFour;
    }

    protected getDueDateInBarCode(barcode: string): string {

        const { BARCODE_FORTY_FOURS, VALUE_TEN_POSITION } = CONFIG_BANKING;
        const { EXPIRATION_FACTOR, NOMINAL_VALUE } = BARCODE_FORTY_FOURS;

        const duteDate = getBarCodeSnippet(barcode, EXPIRATION_FACTOR.start, EXPIRATION_FACTOR.end);

        const value = Number(getBarCodeSnippet(barcode, NOMINAL_VALUE.start, NOMINAL_VALUE.end));

        if (0 >= Number(duteDate) || value === VALUE_TEN_POSITION) { return null; }

        const mommentDate = moment(new Date(CONFIG_BANKING.DATE_BASE));
        return mommentDate.add(duteDate, 'days').format('DD/MM/YYYY');
    }

    protected getValueInBarCode(barcode: string): string {
        const { BARCODE_FORTY_FOURS, VALUE_TEN_POSITION } = CONFIG_BANKING;
        const { EXPIRATION_FACTOR, NOMINAL_VALUE } = BARCODE_FORTY_FOURS;

        let value = Number(getBarCodeSnippet(barcode, NOMINAL_VALUE.start, NOMINAL_VALUE.end));

        if (VALUE_TEN_POSITION === value) {
            value = Number(getBarCodeSnippet(barcode, EXPIRATION_FACTOR.start, NOMINAL_VALUE.end));
        }

        const modifiedValue =  Number((value / 100));
        return modifiedValue.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}).replace(',', '.').replace(/\s/g, '');
    }
}

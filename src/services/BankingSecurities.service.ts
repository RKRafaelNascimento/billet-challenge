import { Injectable } from '@nestjs/common';
import { AbstractBarCode } from 'src/abstracts/AbstractBarCode';
import { IBarCodeInformation } from 'src/interfaces/IBarCodeInformation.interface';
import { PATTERNS, CONFIG_BANKING } from 'src/shared/constants';
import { clearMask, isEvenNumber, getBarCodeSnippet } from 'src/shared/conditions';
import * as moment from 'moment';
@Injectable()
export class BankingSecuritiesService extends AbstractBarCode {

    protected isCorrectFormat(typedLine: string): boolean {
        return !!typedLine.match(PATTERNS.BANKING_SECURITIES);
    }

    protected isValidCheckDigits(barcode: string): boolean {
        const blocks = this.getBlocksByBarCode(barcode);
        const isModuleTenValid = blocks.every(sequence => this.calculateModuleTen(sequence.num) === Number(sequence.DV));

        const barCodeByFortyFour = this.convertBarCode(barcode);
        const DV = barCodeByFortyFour[4];
        const block = barCodeByFortyFour.slice(0, 4) + barCodeByFortyFour.slice(5);

        return isModuleTenValid && (this.calculateModuleEleven(block) === Number(DV));
    }

    public getBarCodeInformation(typedLine: string): IBarCodeInformation {
        const barcode = clearMask(typedLine);
        if (!this.isCorrectFormat(typedLine)) {
            console.log('FORMATO INVALIDO');
        }

        if (!this.isValidCheckDigits(barcode)) {
            console.log('Digitos Verificadores invalido');
        }

        return {
            typedLineValid: this.isCorrectFormat(typedLine),
            value: this.getValueInBarCode(barcode) || null,
            dueDate: this.getDueDateInBarCode(barcode) || null,
            barcode: this.convertBarCode(barcode) || null,
        };
    }

    private getBlocksByBarCode(barcode: string): any[] {
        return [
            {
              num: barcode.slice(0, 9),
              DV: barcode.slice(9, 10),
            },
            {
              num: barcode.slice(10, 20),
              DV: barcode.slice(20, 21),
            },
            {
              num: barcode.slice(21, 31),
              DV: barcode.slice(31, 32),
            },
        ];
    }

    private calculateModuleTen(block: string): number {
        const code: string[] = block.split('').reverse();
        const amount = code.reduce((acc, current, index) => {
            let sum = Number(current) * (isEvenNumber(index) ? 2 : 1);
            sum = (sum > 9 ? Math.trunc(sum / 10) + (sum % 10) : sum);
            return acc + sum;
        }, 0);

        return (Math.ceil(amount / 10) * 10) - amount;
    }

    private calculateModuleEleven(barcode: string): number {
        const code = barcode.split('').reverse();
        let ruleMultiplier = 2;
        const amount = code.reduce((acc, current) => {
        const sum = Number(current) * ruleMultiplier;
        ruleMultiplier = ruleMultiplier === 9 ? 2 : ruleMultiplier + 1;
        return acc + sum;
        }, 0);
        const divisionRest = amount % 11;
        const DV = 11 - divisionRest;
        if (DV === 0 || DV === 10 || DV === 11) { return 1; }
        return DV;
    }

    protected convertBarCode(barcode: string): string {
        const { BARCODE_FORTY_FOURS } = CONFIG_BANKING;

        const barCodeByFortyFour = Object.values(BARCODE_FORTY_FOURS).reduce((acc, current) => {
          return acc + getBarCodeSnippet(barcode, current.start, current.end);
        }, '');

        return barCodeByFortyFour;
    }

    protected getDueDateInBarCode(barcode: string): string {
        const { EXPIRATION_FACTOR } = CONFIG_BANKING.BARCODE_FORTY_FOURS;

        const duteDate = getBarCodeSnippet(barcode, EXPIRATION_FACTOR.start, EXPIRATION_FACTOR.end);
        const mommentDate = moment(new Date(CONFIG_BANKING.DATE_BASE));
        return mommentDate.add(duteDate, 'days').format('DD/MM/YYYY');
    }

    protected getValueInBarCode(barcode: string): string {
        const { NOMINAL_VALUE } = CONFIG_BANKING.BARCODE_FORTY_FOURS;

        const value = Number(getBarCodeSnippet(barcode, NOMINAL_VALUE.start, NOMINAL_VALUE.end));
        const modifiedValue =  Number((value / 100));
        return modifiedValue.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}).replace(',', '.');
    }

}

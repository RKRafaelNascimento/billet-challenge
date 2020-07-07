import { Injectable } from '@nestjs/common';
import { AbstractBarCode } from '../abstracts/AbstractBarCode';
import { IBarCodeInformation } from '../interfaces/IBarCodeInformation.interface';
import { PATTERNS, CONFIG_CONCESSIONAY } from '../shared/constants';
import { clearMask, getBarCodeSnippet } from '../shared/conditions';
import { InvalidVerifiedDigit } from '../shared/expections/InvalidVerifiedDigit';
import * as moment from 'moment';
import { ModuleCalculationService } from './ModuleCalculation.service';
@Injectable()
export class ConcessionaryPaymentsService extends AbstractBarCode {
    constructor(private readonly moduleService: ModuleCalculationService) {
        super();
    }
    protected isCorrectFormat(typedLine: string): boolean {
        return !!typedLine.match(PATTERNS.CONCESSIONARY_PAYMENTS);
    }

    protected isValidCheckDigits(barcode: string): boolean {
        const blocks = this.getBlocksByBarCode(barcode);
        const barCodeByFortyFour = this.convertBarCode(barcode);

        const cod = Number(barCodeByFortyFour[2]);

        const DV = barCodeByFortyFour[3];
        const isModuleTenValid = blocks.every(sequence => {
            if (cod === 6 || cod === 7) {
                return this.moduleService.calculateModuleTen(sequence.num) === Number(sequence.DV);
            } else if (cod === 8 || cod === 9) {
                return this.moduleService.calculateModuleElevenConcessionary(sequence.num) === Number(sequence.DV);
            }
            return false;
        });
        const block = barCodeByFortyFour.slice(0, 3) + barCodeByFortyFour.slice(4);
        let isValid;
        if (cod === 6 || cod === 7) {
            isValid = this.moduleService.calculateModuleTen(block) === Number(DV);
        } else if (cod === 8 || cod === 9) {
            isValid = this.moduleService.calculateModuleElevenConcessionary(block) === Number(DV);
        }

        return isModuleTenValid && isValid;
    }

    public getBarCodeInformation(typedLine: string): IBarCodeInformation {
        const barcode = clearMask(typedLine);
        const barcodeClear = this.convertBarCode(barcode);

        if (!this.isValidCheckDigits(barcode)) {
            throw new InvalidVerifiedDigit(`Dígito verificador inválido: ${typedLine}`);
        }

        const isValid = this.isCorrectFormat(typedLine);
        const notFound = null;
        return {
            typedLineValid: isValid,
            value: isValid ? this.getValueInBarCode(barcodeClear) : notFound ,
            dueDate: isValid ? this.getDueDateInBarCode(barcodeClear) : notFound ,
            barcode: isValid ? barcodeClear : notFound ,
        };
    }

    protected getBlocksByBarCode(barcode: string): Array<{num: string, DV: string}> {
        const { BLOCKS } = CONFIG_CONCESSIONAY;

        const blocks =  Object.values(BLOCKS).map((block) => {
            return {
                num: getBarCodeSnippet(barcode, block.start, block.end),
                DV: getBarCodeSnippet(barcode, block.end, (block.end + 1)),
            };
        });
        return blocks;
    }

    protected convertBarCode(barcode: string): string {
        const { BLOCKS } = CONFIG_CONCESSIONAY;
        const barCodeByFortyFour = Object.values(BLOCKS).reduce((acc, current) => {
            return acc + getBarCodeSnippet(barcode, current.start, current.end);
        }, '');
        return barCodeByFortyFour;
    }

    protected getDueDateInBarCode(barcode: string): string {
        const { EXPIRATION_FACTOR } = CONFIG_CONCESSIONAY;

        const dueDate = getBarCodeSnippet(barcode, EXPIRATION_FACTOR.start, EXPIRATION_FACTOR.end);
        const year = Number(dueDate.slice(0, 4));
        const moth = Math.ceil(Number(dueDate.slice(4, 6)));
        const day = Number(dueDate.slice(6, 8));

        if ((year >= 2050 || year <= 1970) || (12 < moth  || 0 >= moth) || (31 < day || 0 >= day)) {
            return null;
        }

        const mommentDate = moment(new Date(year, (moth - 1), day));
        return mommentDate.format('DD/MM/YYYY');
    }

    protected getValueInBarCode(barcode: string): string {
        const { NOMINAL_VALUE } = CONFIG_CONCESSIONAY;

        const value = Number(getBarCodeSnippet(barcode, NOMINAL_VALUE.start, NOMINAL_VALUE.end));
        const modifiedValue =  Number((value / 100));
        return modifiedValue.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}).replace(',', '.').replace(/\s/g, '');
    }

}

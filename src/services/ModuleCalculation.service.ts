import { Injectable } from '@nestjs/common';
import { isEvenNumber } from '../shared/conditions';
@Injectable()
export class ModuleCalculationService  {

    calculateModuleTen(block: string): number {
        const code: string[] = block.split('').reverse();
        const amount = code.reduce((acc, current, index) => {
            let sum = Number(current) * (isEvenNumber(index) ? 2 : 1);
            sum = (sum > 9 ? Math.trunc(sum / 10) + (sum % 10) : sum);
            return acc + sum;
        }, 0);

        return (Math.ceil(amount / 10) * 10) - amount;
    }

    calculateModuleEleven(barcode: string): number {
        const code = barcode.split('').reverse();
        let ruleMultiplier = 2;
        const amount = code.reduce((acc, current) => {
        const sum = Number(current) * ruleMultiplier;
        ruleMultiplier = ruleMultiplier === 9 ? 2 : ruleMultiplier + 1;
        return acc + sum;
        }, 0);
        const divisionRest = amount % 11;
        const DV = 11 - divisionRest;

        return DV === 0 || DV === 10 || DV === 11 ? 1 : DV;
    }

    calculateModuleElevenConcessionary(barcode: string): number {
        const code = barcode.split('').reverse();
        let ruleMultiplier = 2;
        const amount = code.reduce((acc, current) => {
        const sum = Number(current) * ruleMultiplier;
        ruleMultiplier = ruleMultiplier === 9 ? 2 : ruleMultiplier + 1;
        return acc + sum;
        }, 0);
        const divisionRest = amount % 11;

        if (divisionRest === 0 || divisionRest === 1) {
            return 0;
          }

        if (divisionRest === 10) {
            return 1;
          }

        const DV = 11 - divisionRest;
        return DV;
    }
}

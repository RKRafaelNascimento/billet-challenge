export const clearMask = (typedLine: string) => typedLine.replace(/( |\.|-)/g, '');
export const isEvenNumber = (numb: number) => !(numb % 2);
export const getBarCodeSnippet = (barcode: string, start: number, end: number): string => barcode.slice(start, end);

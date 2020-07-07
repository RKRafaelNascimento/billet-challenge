import { ConfigService } from '../config/Config.service';

const configService = new ConfigService();

export const SERVER_PORT = configService.get('SERVER_PORT');

export const CONFIG_CONCESSIONAY = {
    BLOCKS: {
        FIRST_BLOCK: {start: 0, end: 11 },
        SECOND_BLOCK: {start: 12, end: 23 },
        THRID_BLOCK: {start: 24, end: 35 },
        FOURTH_BLOCK: {start: 36, end: 47},
    },
    EXPIRATION_FACTOR: { start: 19 , end: 27 },
    NOMINAL_VALUE: {start: 4 , end: 15},
};

export const CONFIG_BANKING = {
    DATE_BASE: configService.get('DATE_BASE'),
    VALUE_TEN_POSITION: 9999999999,
    BARCODE_FORTY_FOURS: {
        BANK_IDENTIFICATION: {start: 0 , end: 3},
        CURRENCY_CODE: {start: 3 , end: 4},
        DV: {start: 32 , end: 33},
        EXPIRATION_FACTOR: {start: 33 , end: 37},
        NOMINAL_VALUE: {start: 37 , end: 47},
        FREE_FIELD_ONE: {start: 4 , end: 9},
        FREE_FIELD_TWO: {start: 10 , end: 20},
        FREE_FIELD_THREE: {start: 21 , end: 31},
    },
    BLOCKS: {
        FIRST_BLOCK: {start: 0, end: 9 },
        SECOND_BLOCK: {start: 10, end: 20 },
        THRID_BLOCK: {start: 21, end: 31 },
    },
};

export const PATTERNS = {
    BANKING_SECURITIES: /^\d{5}\.\d{5} \d{5}\.\d{6} \d{5}\.\d{6} \d \d{14}$/g,
    CONCESSIONARY_PAYMENTS: /^\d{11}\-\d \d{11}\-\d \d{11}\-\d \d{11}\-\d$/g,
};

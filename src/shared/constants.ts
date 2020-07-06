import { ConfigService } from 'src/config/Config.service';

const configService = new ConfigService();

export const SERVER_PORT = configService.get('SERVER_PORT');

export const CONFIG_BANKING = {
    DATE_BASE: configService.get('DATE_BASE'),
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
};

export const PATTERNS = {
    BANKING_SECURITIES: /^\d{5}\.\d{5} \d{5}\.\d{6} \d{5}\.\d{6} \d \d{14}$/g,
};

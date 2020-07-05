import { Logger as NestLogger } from '@nestjs/common';

export class Logger extends NestLogger {
  constructor() {
    super('billet-challenge');
  }
}

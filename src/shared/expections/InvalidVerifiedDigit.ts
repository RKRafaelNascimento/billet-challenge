import { BadRequestException } from '@nestjs/common';

export class InvalidVerifiedDigit extends BadRequestException {
  constructor(message: string) {
    super(message);
  }
}

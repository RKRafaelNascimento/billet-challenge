import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/modules/app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SERVER_PORT } from 'src/shared/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const logger = new Logger();

  await app.listen(SERVER_PORT, () => {
    logger.log(`Server is running on port: ${SERVER_PORT}`);
  });

}
bootstrap();

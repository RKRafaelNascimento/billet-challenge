import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';

import { Logger } from '../shared/logger';

export type EnvConfig = Record<string, string>;

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor() {
    const config = dotenv.parse(
      fs.readFileSync(`.env.${process.env.NODE_ENV || 'development'}`),
    );

    this.envConfig = this.validateInput(config);
  }

  get(key: string): string | any {
    return this.envConfig[key];
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production', 'test')
        .default('development'),
      SERVER_PORT: Joi.string().required(),
      DATE_BASE: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = envVarSchema.validate(
      envConfig,
    );

    if (error) {
      const logger = new Logger();

      logger.error(
        'ERRO: Configure corretamente as variáveis de ambiente antes de iniciar o servidor',
      );
      logger.error(`Config validation error: ${error.message}`);
      logger.warn(
        'NOTA: utilize o arquivo .env.example como base para a configuração',
      );
    }

    return validatedEnvConfig;
  }

  isProduction() {
    return this.get('NODE_ENV') === 'production';
  }

  isDevelopment() {
    return this.get('NODE_ENV') === 'development';
  }
}

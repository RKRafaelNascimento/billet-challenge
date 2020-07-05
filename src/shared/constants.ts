import { ConfigService } from 'src/config/Config.service';

const configService = new ConfigService();

export const SERVER_PORT = configService.get('SERVER_PORT');


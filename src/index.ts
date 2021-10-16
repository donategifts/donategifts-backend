import { config } from 'dotenv';
import { logger } from './helper/logger';
import { boot } from './server';

config();

boot().catch((error) => logger.error(error));

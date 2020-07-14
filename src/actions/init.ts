import fs from 'fs-extra';
import { resolve } from 'path';
import { CONFIG_FILE, Config } from '../constants';
import logger from '../logger';

const defaultConfig: Config = {
  migrationsPath: './migrations',
  dataPaths: ['./data'],
};

export default async function init(): Promise<void> {
  logger.info('Initializing migration config');

  const path = resolve(process.cwd(), CONFIG_FILE);
  const exists = await fs.pathExists(path);

  if (exists) {
    logger.error('Looks like you already initialized config for this project');
    process.exit(1);
  }

  await fs.writeJson(path, defaultConfig, { spaces: 2 });

  logger.success(`Config emmited to "${path}"`);
}

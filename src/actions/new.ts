import { format } from 'date-fns';
import fs from 'fs-extra';
import { resolve } from 'path';
import { codeBlock } from 'common-tags';
import { snakeCase } from 'change-case';
import { Config, CONFIG_FILE } from '../constants';
import logger from '../logger';

const migrationFunction = codeBlock`
  /**
   * Migration function
   * @param {object}  originalJson  The original json
   * @return {object}  Transformed
   */
  export default function migrate(originalJson) {
    // Transform original json data and return
    // new object that will be saved in its place
    return originalJson;
  }
`;

export default async function newMigration(name?: string): Promise<void> {
  if (!name) {
    logger.error('Please provide a name for this migration');
    process.exit(1);
  }

  logger.info('Generating new migration script');
  const config: Config = await fs.readJson(resolve(process.cwd(), CONFIG_FILE));
  const timestamp = format(new Date(), 'yyyy_MM_dd_hhmmss');
  const fileName = `${timestamp}_${snakeCase(name)}.js`;
  const migrationsDir = resolve(process.cwd(), config.migrationsPath);
  const filePath = resolve(migrationsDir, fileName);

  await fs.ensureDir(migrationsDir);
  await fs.writeFile(filePath, migrationFunction);
  logger.success(`Emitted migration script to "${filePath}"`);
}

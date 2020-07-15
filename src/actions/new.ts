import { format } from 'date-fns';
import fs from 'fs-extra';
import { resolve } from 'path';
import { codeBlock } from 'common-tags';
import { snakeCase } from 'change-case';
import logger from '../utils/logger';
import getConfig from '../utils/getConfig';

const migrationFunction = codeBlock`
  /**
   * Migration function
   * @param {object}  originalJson  The original json
   * @return {object}  Transformed
   */
  module.exports = function migrate(originalJson) {
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
  const config = await getConfig();
  const timestamp = format(new Date(), 'yyyy_MM_dd_hhmmss');
  const fileName = `${timestamp}_${snakeCase(name)}.js`;
  const migrationsDir = resolve(process.cwd(), config.migrationsPath);
  const filePath = resolve(migrationsDir, fileName);

  await fs.ensureDir(migrationsDir);
  await fs.writeFile(filePath, migrationFunction);

  logger.success(`Emitted migration script to "${filePath}"`);
}

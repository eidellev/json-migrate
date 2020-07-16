import { resolve } from 'path';
import fs from 'fs-extra';
import requireDir from 'require-dir';
import globby from 'globby';
import chalk from 'chalk';
import { HISTORY_FILE } from '../constants';
import getConfig from '../utils/getConfig';
import logger from '../utils/logger';

export default async function run(): Promise<void> {
  const config = await getConfig();
  const migrationsPath = resolve(process.cwd(), config.migrationsPath);
  const migrationsPathExists = await fs.pathExists(migrationsPath);

  logger.info('Starting migrations');
  logger.info(`Looking for migration scripts at ${chalk.bold.green(migrationsPath)}`);

  if (!migrationsPathExists) {
    logger.error('Migrations directory could not be found');
    process.exit(1);
  }

  let history: string[];
  const historyFilePath = resolve(migrationsPath, HISTORY_FILE);
  const historyFileExists = await fs.pathExists(historyFilePath);

  if (!historyFileExists) {
    logger.debug('No history found');
    history = [];
  } else {
    history = await fs.readJson(historyFilePath);
  }

  const migrations = requireDir(migrationsPath, { extensions: ['.js'] });
  const dataFiles = await globby(config.dataPaths);

  for (const [name, migration] of Object.entries(migrations)) {
    if (history.includes(name)) {
      logger.info(`Skipping previously executed migration ${chalk.bold.green(name)}\n`);
      continue;
    }

    logger.info(`Running migration ${chalk.bold.yellow(name)}`);

    for (const file of dataFiles) {
      const filePath = resolve(process.cwd(), file);
      logger.info(`Migrating file ${chalk.bold.yellow(filePath)}`);

      const originalData = await fs.readJson(filePath);
      const migratedData = migration(originalData);

      await fs.writeJson(filePath, migratedData, { spaces: 4 });
      logger.success(`Migrated file ${chalk.bold.green(filePath)}\n`);
    }

    logger.success(`Finished migration ${chalk.bold.green(name)}`);
    history.push(name);
  }

  logger.info('Updating history file');

  await fs.writeJson(historyFilePath, history, { spaces: 2 });

  logger.success('All done!\n');
  logger.info("If you are happy with the changes, please don't forget to commit! ");
}

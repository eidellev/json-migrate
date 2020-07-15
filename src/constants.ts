export const CONFIG_FILE = '.json-migrate.json';

export const HISTORY_FILE = '.migrations-history.json';

export interface Config {
  migrationsPath: string;
  /**
   * Glob patterns
   */
  dataPaths: string | string[];
}

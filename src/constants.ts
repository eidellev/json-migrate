export const CONFIG_FILE = '.json-migrate.json';

export interface Config {
  migrationsPath: string;
  dataPaths: string[];
}

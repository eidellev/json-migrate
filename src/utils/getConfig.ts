import fs from 'fs-extra';
import { resolve } from 'path';
import { Config, CONFIG_FILE } from '../constants';

export default async function getConfig(): Promise<Config> {
  const config: Config = await fs.readJson(resolve(process.cwd(), CONFIG_FILE));

  return config;
}

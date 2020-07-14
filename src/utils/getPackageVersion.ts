import fs from 'fs-extra';
import { resolve } from 'path';

export default function getPackageVersion(): string {
  const packageJsonPath = resolve(__dirname, '../../package.json');
  const { version } = fs.readJsonSync(packageJsonPath);

  return version;
}

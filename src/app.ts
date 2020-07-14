import { Command } from 'commander';
import init from './actions/init';
import newMigration from './actions/new';
import getPackageVersion from './utils/getPackageVersion';

const command = new Command();

command.name('json-migrate').version(getPackageVersion());

command.command('init').description('Initialize json-migrate and generate default configuration').action(init);

command
  .command('new [name]')
  .description('Initialize json-migrate and generate default configuration')
  .action(newMigration);

command.parse(process.argv);

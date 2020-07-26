import { Command } from 'commander';
import init from './actions/init';
import newMigration from './actions/new';
import run from './actions/run';
import getPackageVersion from './utils/getPackageVersion';
const command = new Command();

command.name('migrate').version(getPackageVersion());

command.command('init').description('Initialize json-migrate and generate default configuration').action(init);

command.command('new [name]').description('Create a new migration script').action(newMigration);

command
  .command('run')
  .description('Run all migrations')
  .option('F, --fresh', 'Ignore history and re-run all migrations')
  .action(run);

command.parse(process.argv);

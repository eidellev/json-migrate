import { Command } from 'commander';
import init from './actions/init';

const jsonMigrate = new Command();

jsonMigrate.command('init').description('Initialize json-migrate and generate default configuration').action(init);

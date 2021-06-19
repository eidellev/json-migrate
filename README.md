# @eidellev/json-migrate

A data migration tool for your `JSON` files.

## Installation

```bash
# globally
npm i -g @eidellev/json-migrate
#or
yarn global add @eidellev/json-migrate

# locally
npm i @eidellev/json-migrate
#or
yarn add @eidellev/json-migrate
```

## Basic CLI Usage

```bash
Usage: migrate [options] [command]

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  init            Initialize json-migrate and generate default configuration
  new [name]      Create a new migration script
  run             Run all migrations
  help [command]  display help for command
```

## The `run` command

```bash
Usage: migrate run [options]

Run all migrations

Options:
  F, --fresh  Ignore history and re-run all migrations
  -h, --help  display help for command
```

## Configuration

```json
{
  "migrationsPath": "./migrations",
  "dataPaths": "data/**/*.json"
}
```

- `migrationsPath (string)` - The directory where `json-migrate` will look for migration scripts.
- `dataPaths (string or string array)` - Glob expression(s). Where `json-migrate` should look for data files.

## Migrations history

`json-migrate` will keep a list of migrations that had been previously run in `.migrations-history.json` and will not run the same migration again. If you wish re-run a specific migration, simply delete it from the file.

## Migration Script Example

```js
/**
 * Migration function
 * @param {object}  originalJson  The original json
 * @return {object}  Transformed
 */
module.exports = function migrate(originalJson) {
  // Transform original json data and return
  // new object that will be saved in its place
  return originalJson;
};
```

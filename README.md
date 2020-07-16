# @eidellev/json-migrate

---

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

## CLI Usage

```bash
Usage: migrate [options] [command]

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  init            Initialize json-migrate and generate default configuration
  new [name]      Initialize json-migrate and generate default configuration
  run             Run all migrations
  help [command]  display help for command
```

## Configuration

```json
{
  "migrationsPath": "./migrations",
  "dataPaths": "data/**/*.json"
}
```

- `migrationsPath (string)` - The directory where `json-migarte` will look for migration scripts.
- `dataPaths (string or string array)` - Glob expression(s). Where `json-migrate` should look for data files.

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

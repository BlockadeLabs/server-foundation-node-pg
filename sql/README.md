# Postgres SQL Files

The Postgres SQL files are stored in the `schema/` sub-folder. They are named in order so that they can be run on a postgres installation in the correct order without maintaining a configuration file.

## Filename Numbering Convention

Each file should start with a number, preceded by three zeroes to allow for correct ordering.

**Example:**
```
000_create_account_table.sql
001_create_session_table.sql
002_alter_account_table_add_username_field.sql
```

## Filename Convention

The filenames should only specify what changes they contain to the database schema. It does not need to be exact, just clear enough to state the changes within.

## Deprecation strategy

If reaching a point where it's cleaner to consolidate all of the database creation operations into fewer files, migrate and version the previous schema. Eventually, it may make sense to delete old schema versions entirely, but you need to be certain that the old schema does not serve any future purpose, and that all development, staging, live, and production servers have migrated to the new schema.

import type { ConfigService } from '@nestjs/config';
import type { DataSourceOptions } from 'typeorm';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Только настройки PostgreSQL.
type PostgresOptions = Extract<
  DataSourceOptions,
  { type: 'postgres' }
>;

export function createDatabaseConfig(
  config: ConfigService,
): PostgresOptions {
  const port = Number(config.get<string>('DB_PORT') ?? '5432');

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('DB_PORT must be an integer between 1 and 65535');
  }

  return {
    type: 'postgres',
    host: config.getOrThrow<string>('DB_HOST'),
    port,
    username: config.getOrThrow<string>('DB_USERNAME'),
    password: config.getOrThrow<string>('DB_PASSWORD'),
    database: config.getOrThrow<string>('DB_DATABASE'),
    synchronize: false,
    entities: [dirname(fileURLToPath(import.meta.url)) + '/../**/*.entity{.ts,.js}'],
    migrations: [dirname(fileURLToPath(import.meta.url)) + '/../migrations/**/*{.ts,.js}'],
  };
}
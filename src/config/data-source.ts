import 'reflect-metadata';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { createDatabaseConfig } from '@app/config/database.config.js';

await ConfigModule.forRoot();

export default new DataSource(
  createDatabaseConfig(new ConfigService()),
);
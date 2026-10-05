import { Module } from '@nestjs/common';
// import { createObserveModule } from '@nestjs/observe';
import { AppController } from '@app/app.controller.js';
import { AppService } from '@app/app.service.js';
import { TagModule } from '@app/tag/tag.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createDatabaseConfig } from '@app/config/database.config.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module.js';

// export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // // Distributed tracing, auto-correlated logs, request/job metrics, error
    // // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    // ObserveModule.forRoot({
    //   appKey: 'YOUR_APP_KEY',
    //   appSecret: 'YOUR_APP_SECRET',
    //   serviceId: 'bakend-app',
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ...createDatabaseConfig(config),
        autoLoadEntities: true,
      }),
    }),
    TagModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

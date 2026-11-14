import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
@Module({ imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: ['apps/api/.env', '.env'] }), HealthModule] })
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChartsController } from './charts.controller';
import { ChartsService } from './charts.service';
import { DatabaseClient } from './database-client.provider';

@Module({
  imports: [ConfigModule],
  controllers: [ChartsController],
  providers: [ChartsService, DatabaseClient],
})
export class ChartsModule {}

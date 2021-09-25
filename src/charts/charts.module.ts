import { Module } from '@nestjs/common'
import { ChartsController } from './charts.controller'
import { ChartsService } from './charts.service'
import { DatabaseClient } from './database-client.provider'

@Module({
  imports: [],
  controllers: [ChartsController],
  providers: [ChartsService, DatabaseClient]
})
export class ChartsModule {}

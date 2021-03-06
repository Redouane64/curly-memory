import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ChartsModule } from './charts/charts.module'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ChartsModule],
  controllers: [],
  providers: []
})
export class AppModule {}

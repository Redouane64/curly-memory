import {
  Controller,
  Get,
  HttpCode,
  Logger,
  Param,
  ParseIntPipe
} from '@nestjs/common'
import { ChartsService } from './charts.service'
import { CandlestickDto } from './interfaces'

@Controller('charts')
export class ChartsController {
  private readonly logger = new Logger(ChartsController.name)

  constructor(private readonly chartsService: ChartsService) {}

  @Get(':ticker/:year')
  @HttpCode(200)
  async candlestick(
    @Param('ticker') ticker: string,
    @Param('year', ParseIntPipe) year: number
  ): Promise<CandlestickDto> {
    return await this.chartsService.getDataByTicker(ticker, year)
  }
}

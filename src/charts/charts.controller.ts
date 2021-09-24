import { Controller, Get, Logger, Param } from '@nestjs/common';
import { ChartsService } from './charts.service';

@Controller('charts')
export class ChartsController {
  private readonly logger = new Logger(ChartsController.name);

  constructor(private readonly chartsService: ChartsService) {}

  @Get(':ticker/:year')
  async candlestick(
    @Param('ticker') ticker: string,
    @Param('year') year: number,
  ): Promise<unknown> {
    return await this.chartsService.getDataByTicker(ticker, year);
  }
}

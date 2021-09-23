import { Controller, Param, Query } from '@nestjs/common';

@Controller('companies')
export class CompaniesController {
  candlestick(
    @Param('ticker') ticker: string,
    @Query('year') year: number,
  ): unknown {
    return { ticker, year };
  }
}

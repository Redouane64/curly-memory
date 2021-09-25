import { Injectable, Inject, Logger } from '@nestjs/common'
import { Client } from 'pg'
import { CandlestickDto, WeekEntry } from './interfaces'

@Injectable()
export class ChartsService {
  private readonly logger = new Logger(ChartsService.name)

  constructor(@Inject('Database') private readonly client: Client) {}

  async getDataByTicker(ticker: string, year: number): Promise<CandlestickDto> {
    const { rows = null } = await this.client.query<WeekEntry>(
      `select distinct
            extract(week from date) as week,
            min(low) over (partition by extract(week from date)) as min_price,
            max(high) over (partition by extract(week from date)) as max_price,
            first_value(open) over (partition by extract(week from date) order by date asc) as open_price,
            first_value(close) over (partition by extract(week from date) order by date desc) as close_price
        from
            price_history
        where
            ticker = $1::text
        and
            date between make_date($2::integer,01,01) and make_date(($2::integer),12,28)
        order by week
      `,
      [ticker, year]
    )

    return { year, entries: rows }
  }
}

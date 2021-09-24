import { Injectable, Inject, Logger } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class ChartsService {
  private readonly logger = new Logger(ChartsService.name);

  constructor(@Inject(Client) private readonly client: Client) {}

  async getDataByTicker(ticker: string, year?: number) {
    const { rows = null } = await this.client.query(
      `select distinct
        date_part('week', date) as week,
        avg(low) over (partition by date_part('week', date)) as low,
        avg(high) over (partition by date_part('week', date)) as high,
        avg(open) over (partition by date_part('week', date)) as open,
        avg(close) over (partition by date_part('week', date)) as close
      from
          price_history
      where
          ticker = $1::text
      and
          date between make_date($2::integer,01,01) and make_date(($2::integer) + 1,01,01)
      order by week`,
      [ticker, year],
    );

    return rows;
  }
}

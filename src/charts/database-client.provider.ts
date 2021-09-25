import { FactoryProvider, Logger, Scope } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Client } from 'pg'

export const DatabaseClient: FactoryProvider = {
  provide: Client,
  scope: Scope.DEFAULT,
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => {
    const logger = new Logger('DatabaseClient')

    const client = new Client({
      host: config.get('PG_HOST'),
      port: config.get('PG_PORT'),
      database: config.get('PG_DATABASE'),
      user: config.get('PG_USERNAME'),
      password: config.get('PG_PASSWORD')
    })

    try {
      await client.connect()
    } catch (error) {
      logger.error('Unable to connecto to the database')
      logger.error(error)
    }

    return client
  }
}

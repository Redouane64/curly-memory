import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()
  const host = process.env.HOST || '127.0.0.1'
  const port = process.env.PORT || 3000
  const logger = new Logger(bootstrap.name)
  await app.listen(port, host, () =>
    logger.log(`Application listening on ${host}:${port}`)
  )
}
bootstrap()

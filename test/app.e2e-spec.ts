import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { ChartsService } from '../src/charts/charts.service'
import { AppModule } from '../src/app.module'

describe('AppController (e2e)', () => {
  let app: INestApplication
  const chartServiceMock = {
    getDataByTicker: () => ({
      entries: []
    })
  }

  beforeEach(async () => {
    /* eslint-disable prettier/prettier */
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    })
      .overrideProvider(ChartsService)
      .useValue(chartServiceMock)
      .overrideProvider('Database')
      .useValue({})
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('GET /ticker/year', () => {
    const url = '/charts/acme/2020'
    return request(app.getHttpServer())
      .get(url)
      .expect(200)
      .expect({ entries: [] })
  })

  it('GET /ticker/year (incorrect year)', () => {
    const badUrl = '/charts/acme/AAAA'
    return request(app.getHttpServer()).get(badUrl).expect(400)
  })

  afterAll(async () => {
    await app.close()
  })
})

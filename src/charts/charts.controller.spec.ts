import { Test, TestingModule } from '@nestjs/testing'
import { ChartsController } from './charts.controller'
import { ChartsService } from './charts.service'

describe('ChartsController', () => {
  let controller: ChartsController

  beforeEach(async () => {
    /* eslint-disable prettier/prettier */
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChartsController],
      providers: [ChartsService]
    })
      .overrideProvider(ChartsService)
      .useValue({
        getDataByTicker: () => ({
          entries: []
        })
      })
      .compile()

    controller = module.get<ChartsController>(ChartsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should return a value', async () => {
    const result = await controller.candlestick('TSLA', 2019)

    expect(result).toHaveProperty('entries')
    expect(result.entries).toStrictEqual([])
  })
})

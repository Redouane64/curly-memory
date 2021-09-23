import { Module } from '@nestjs/common';
import { CompaniesController } from './companies/companies.controller';
import { CompaniesService } from './companies/companies.service';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class ChartsModule {}

import { CustomersController } from './customers.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [CustomersController],
})
export class CustomersModule {}

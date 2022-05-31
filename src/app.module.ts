import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { getEnvPath } from './common/helpers/env.helper';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';
import { CustomersModule } from './customers/customers.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { DatabaseModule } from 'src/database/database.module';

const envFilePath = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
      validationSchema: Joi.object({
        MODE: Joi.string().valid('dev', 'prod', 'example').required(),
        PORT: Joi.number().default(3000),
        DB_PASSWORD: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      }),

      /* 
      DOESN'T WORK
      validationOptions: {
        allowUnknown: false,
        abortEarly: false,
      }, */
    }),
    DatabaseModule,
    ProductsModule,
    CategoriesModule,
    BrandsModule,
    CustomersModule,
    UsersModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

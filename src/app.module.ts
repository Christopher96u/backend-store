import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from './common/helpers/env.helper';

const envFilePath = getEnvPath(`${__dirname}/common/envs`);

import { ProductsController } from './products/products.controller';
import { CategoriesController } from './categories/categories.controller';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';
import { CustomersController } from './customers/customers.controller';
import { CustomersModule } from './customers/customers.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsService } from './products/products.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
    }),
    ProductsModule,
    CategoriesModule,
    BrandsModule,
    CustomersModule,
    UsersModule,
    OrdersModule,
  ],
  controllers: [
    AppController,
    ProductsController,
    CategoriesController,
    CustomersController,
    UsersController,
  ],
  providers: [AppService, ProductsService],
})
export class AppModule {}

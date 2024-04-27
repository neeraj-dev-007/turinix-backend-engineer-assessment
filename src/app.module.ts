import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesModule } from './components/roles/roles.module';
import { DepartmentsModule } from './components/departments/departments.module';
import { EmployeesModule } from './components/employees/employees.module';
import { ShiftsModule } from './components/shifts/shifts.module';
import { LoggerMiddleware } from './utils/middlewares/logger/logger.middleware';
import { DEPARTMENTS } from './utils/constants/api-endpoints';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Department } from './components/departments/department.entity';

@Module({
  imports: [
    RolesModule,
    DepartmentsModule,
    EmployeesModule,
    ShiftsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://jojzmzjv:dpslUnGbuNoVX-emvHKKDtIJO5zR7Csr@kiouni.db.elephantsql.com/jojzmzjv',
      username: 'jojzmzjv',
      password: 'dpslUnGbuNoVX-emvHKKDtIJO5zR7Csr',
      database: 'jojzmzjv',
      synchronize: true,
      entities: [Department],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {
    console.log(dataSource.driver.database);
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(DEPARTMENTS);
  }
}

import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './services/employees.service';
import { Employee } from './entities/employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsModule } from '../departments/departments.module';
import { RolesModule } from '../roles/roles.module';
import { Availability } from './entities/availability.entity';
import { Schedule } from './entities/schedule.entity';
import { EmployeesAvailabilityService } from './services/employees-availability.service';
import { EmployeesSchedulingService } from './services/employees-scheduling.service';
import { DateEntity } from './entities/date.entity';
import { ShiftsModule } from '../shifts/shifts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee, Availability, DateEntity, Schedule]),
    DepartmentsModule,
    RolesModule,
    ShiftsModule,
  ],
  controllers: [EmployeesController],
  providers: [
    EmployeesService,
    EmployeesAvailabilityService,
    EmployeesSchedulingService,
  ],
})
export class EmployeesModule {}

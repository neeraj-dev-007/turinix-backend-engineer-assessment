import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  EMPLOYEES,
  EMPLOYEE_ID,
  EMPLOYEE_ID_ENDPOINT,
} from 'src/utils/constants/api-endpoints';
import { EmployeesService } from './services/employees.service';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { UpdateEmployeeDto } from './dtos/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { CreateAvailabilityDto } from './dtos/create-availability.dto';
import { Availability } from './entities/availability.entity';
import { EmployeesAvailabilityService } from './services/employees-availability.service';
import { EmployeesSchedulingService } from './services/employees-scheduling.service';
import { AssignShiftDto } from './dtos/assign-shift.dto';

@Controller(EMPLOYEES)
export class EmployeesController {
  constructor(
    private employeesService: EmployeesService,
    private employeesAvailabilityService: EmployeesAvailabilityService,
    private employeesSchedulingService: EmployeesSchedulingService,
  ) {}

  @Post()
  async createEmployee(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    return this.employeesService.createEmployee(createEmployeeDto);
  }

  @Get()
  async getAllEmployees(): Promise<Employee[]> {
    return this.employeesService.getAllEmployees();
  }

  @Get('schedule?')
  async getSchedules(
    @Query('startDate') startDate: number,
    @Query('endDate') endDate: number,
  ) {
    return this.employeesSchedulingService.getSchedules(startDate, endDate);
  }

  @Get(EMPLOYEE_ID_ENDPOINT)
  getEmployeeById(@Param(EMPLOYEE_ID, ParseIntPipe) employeeId: number) {
    try {
      return this.employeesService.getEmployeeById(employeeId);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
    }
  }

  @Put(EMPLOYEE_ID_ENDPOINT)
  updateEmployee(
    @Param(EMPLOYEE_ID, ParseIntPipe) employeeId: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.updateEmployee(employeeId, updateEmployeeDto);
  }

  @Delete(EMPLOYEE_ID_ENDPOINT)
  deleteEmployee(@Param(EMPLOYEE_ID, ParseIntPipe) employeeId: number) {
    return this.employeesService.deleteEmployee(employeeId);
  }

  @Post(':employeeId/availability')
  async createAvailability(
    @Param(EMPLOYEE_ID, ParseIntPipe) employeeId: number,
    @Body() createAvailabilityDto: CreateAvailabilityDto,
  ): Promise<Availability> {
    return this.employeesAvailabilityService.createAvailability(
      createAvailabilityDto,
    );
  }

  @Post(':employeeId/assign-shift')
  createShift(
    @Param(EMPLOYEE_ID, ParseIntPipe) employeeId: number,
    @Body() assignShiftDto: AssignShiftDto,
  ) {
    return this.employeesSchedulingService.assignShift(assignShiftDto);
  }

  @Get(':employeeId/schedule?')
  getSchedulesByEmployeeId(
    @Param(EMPLOYEE_ID, ParseIntPipe) employeeId: number,
    @Query('startDate') startDate: number,
    @Query('endDate') endDate: number,
  ) {
    return this.employeesSchedulingService.getScheduleByEmployeeID(
      employeeId,
      startDate,
      endDate,
    );
  }
}

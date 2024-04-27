import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EMPLOYEES, EMPLOYEE_ID } from 'src/utils/constants/api-endpoints';
import { EmployeesService } from './employees.service';

@Controller(EMPLOYEES)
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  @Post()
  createEmployee(@Body() createEmployeeDto:) {
    this.employeesService.createEmployee(createEmployeeDto);
  }

  @Get()
  getAllEmployees() {
    this.employeesService.getAllEmployees();
  }

  @Get(EMPLOYEE_ID)
  getEmployeeById(@Param(EMPLOYEE_ID) employeeId: number) {
    this.employeesService.getEmployeeById(employeeId);
  }

  @Put(EMPLOYEE_ID)
  updateEmployee(@Param(EMPLOYEE_ID) employeeId: number, @Body() updateEmployeeDto: ) {
    this.employeesService.updateEmployee(employeeId, updateEmployeeDto);
  }

  @Delete(EMPLOYEE_ID)
  deleteEmployee(@Param(EMPLOYEE_ID) employeeId: number) {
    this.employeesService.deleteEmployee(employeeId);
  }
}

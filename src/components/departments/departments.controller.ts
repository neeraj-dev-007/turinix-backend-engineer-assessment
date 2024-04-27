import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DEPARTMENTS, DEPARTMENT_ID } from 'src/utils/constants/api-endpoints';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dtos/create-department.dto';
import { UpdateDepartmentDto } from './dtos/update-department.dto';

@Controller(DEPARTMENTS)
export class DepartmentsController {
  constructor(private departmentsService: DepartmentsService) {}

  @Post()
  createDepartment(@Body() createDepartmentDto: CreateDepartmentDto) {
    this.departmentsService.createDepartment(createDepartmentDto);
  }

  @Get()
  getAllDepartments() {
    this.departmentsService.getAllDepartments();
  }

  @Get(DEPARTMENT_ID)
  getDepartmentById(@Param(DEPARTMENT_ID) departmentId: number) {
    this.departmentsService.getDepartmentById(departmentId);
  }

  @Put(DEPARTMENT_ID)
  updateDepartment(
    @Param(DEPARTMENT_ID) departmentId: number,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    this.departmentsService.updateDepartment(departmentId, updateDepartmentDto);
  }

  @Delete(DEPARTMENT_ID)
  deleteDepartment(@Param(DEPARTMENT_ID) departmentId: number) {
    this.departmentsService.deleteDepartment(departmentId);
  }
}

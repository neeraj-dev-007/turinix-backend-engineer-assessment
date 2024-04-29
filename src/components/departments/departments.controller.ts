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
} from '@nestjs/common';
import {
  DEPARTMENTS,
  DEPARTMENT_ID,
  DEPARTMENT_ID_ENDPOINT,
} from 'src/utils/constants/api-endpoints';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dtos/create-department.dto';
import { UpdateDepartmentDto } from './dtos/update-department.dto';
import { Department } from './department.entity';

@Controller(DEPARTMENTS)
export class DepartmentsController {
  constructor(private departmentsService: DepartmentsService) {}

  @Post()
  async createDepartment(
    @Body() createDepartmentDto: CreateDepartmentDto,
  ): Promise<Department> {
    return this.departmentsService.createDepartment(createDepartmentDto);
  }

  @Get()
  async getAllDepartments(): Promise<Department[]> {
    return this.departmentsService.getAllDepartments();
  }

  @Get(DEPARTMENT_ID_ENDPOINT)
  async getDepartmentById(
    @Param(DEPARTMENT_ID, ParseIntPipe) departmentId: number,
  ) {
    try {
      return this.departmentsService.getDepartmentById(departmentId);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
    }
  }

  @Put(DEPARTMENT_ID_ENDPOINT)
  async updateDepartment(
    @Param(DEPARTMENT_ID, ParseIntPipe) departmentId: number,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    try {
      return this.departmentsService.updateDepartment(
        departmentId,
        updateDepartmentDto,
      );
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
    }
  }

  @Delete(DEPARTMENT_ID_ENDPOINT)
  async deleteDepartment(
    @Param(DEPARTMENT_ID, ParseIntPipe) departmentId: number,
  ) {
    try {
      return this.departmentsService.deleteDepartment(departmentId);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
    }
  }
}

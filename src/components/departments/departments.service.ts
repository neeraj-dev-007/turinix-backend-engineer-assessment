import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dtos/create-department.dto';
import { UpdateDepartmentDto } from './dtos/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  createDepartment(createDepartmentDto: CreateDepartmentDto) {}

  getAllDepartments() {
    this.departmentRepository.find();
  }

  getDepartmentById(departmentId: number) {
    this.departmentRepository.findOneBy({ departmentId });
  }

  updateDepartment(
    departmentId: number,
    updateDepartmentDto: UpdateDepartmentDto,
  ) {}

  deleteDepartment(departmentId: number) {}
}

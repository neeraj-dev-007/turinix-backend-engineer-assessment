import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async createDepartment(
    createDepartmentDto: CreateDepartmentDto,
  ): Promise<Department> {
    const department = new Department();
    department.department = createDepartmentDto.department;
    try {
      return await this.departmentRepository.save(department);
    } catch (err) {
      throw new HttpException('SERVER ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllDepartments(): Promise<Department[]> {
    try {
      return await this.departmentRepository.find();
    } catch (err) {
      throw new HttpException('SERVER ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getDepartmentById(departmentId: number): Promise<Department> {
    const department = await this.departmentRepository.findOneBy({
      departmentId: departmentId,
    });
    if (!department) throw new NotFoundException('DEPARTMENT NOT FOUND');
    return department;
  }

  async getDepartmentsByIds(departmentIds: number[]): Promise<Department[]> {
    const departments = await this.departmentRepository
      .createQueryBuilder('department')
      .where('department.departmentId IN (:...departmentIds)', {
        departmentIds: [...departmentIds],
      })
      .getMany();
    if (!departments.length)
      throw new NotFoundException('DEPARTMENTS NOT FOUND');
    return departments;
  }

  async updateDepartment(
    departmentId: number,
    updateDepartmentDto: UpdateDepartmentDto,
  ) {
    await this.getDepartmentById(departmentId);
    await this.departmentRepository.update(departmentId, updateDepartmentDto);
    return { staus: HttpStatus.OK, message: 'DEPARTMENT UPDATED' };
  }

  async deleteDepartment(departmentId: number) {
    await this.getDepartmentById(departmentId);
    await this.departmentRepository.delete(departmentId);
    return { staus: HttpStatus.OK, message: 'DEPARTMENT DELETED' };
  }
}

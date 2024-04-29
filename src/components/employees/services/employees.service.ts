import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeeDto } from '../dtos/create-employee.dto';
import { Repository } from 'typeorm';
import { Employee } from '../entities/employee.entity';
import { UpdateEmployeeDto } from '../dtos/update-employee.dto';
import { DepartmentsService } from '../../departments/departments.service';
import { RolesService } from '../../roles/roles.service';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private departmentsService: DepartmentsService,
    private rolesService: RolesService,
  ) {}

  async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    const employee = new Employee();
    employee.firstName = createEmployeeDto.firstName;
    employee.lastName = createEmployeeDto.lastName;
    employee.maxWorkingHours = createEmployeeDto.maxWorkingHours;
    employee.email = createEmployeeDto.email;
    employee.mobile = createEmployeeDto.mobile;
    const department = await this.departmentsService.getDepartmentById(
      createEmployeeDto.department,
    );
    employee.department = department;
    const role = await this.rolesService.getRoleById(createEmployeeDto.role);
    employee.role = role;

    try {
      return await this.employeeRepository.save(employee);
    } catch (err) {
      throw new HttpException('SERVER ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllEmployees(): Promise<Employee[]> {
    try {
      return await this.employeeRepository.find();
    } catch (err) {
      throw new HttpException('SERVER ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getEmployeeById(employeeId: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOneBy({
      employeeId: employeeId,
    });
    if (!employee) throw new NotFoundException('EMPLOYEE NOT FOUND');
    return employee;
  }

  async updateEmployee(
    employeeId: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ) {
    await this.getEmployeeById(employeeId);
    try {
      await this.employeeRepository.update(employeeId, updateEmployeeDto);
      return { staus: HttpStatus.OK, message: 'EMPLOYEE UPDATED' };
    } catch (err) {
      throw new HttpException('SERVER ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteEmployee(employeeId: number) {
    await this.getEmployeeById(employeeId);
    try {
      await this.employeeRepository.delete(employeeId);
      return { staus: HttpStatus.OK, message: 'EMPLOYEE DELETED' };
    } catch (err) {
      throw new HttpException('SERVER ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

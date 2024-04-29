import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { CreateRoleDto } from './dtos/create-role.dto';
import { DepartmentsService } from '../departments/departments.service';
import { UpdateRoleDto } from './dtos/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    private departmentsService: DepartmentsService,
  ) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = new Role();
    role.role = createRoleDto.role;
    const department = await this.departmentsService.getDepartmentById(
      createRoleDto.department,
    );
    role.department = department;
    try {
      return await this.roleRepository.save(role);
    } catch (err) {
      throw new HttpException('SERVER ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllRoles(): Promise<Role[]> {
    try {
      return await this.roleRepository.find();
    } catch (err) {
      throw new HttpException('SERVER ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getRoleById(roleId: number): Promise<Role> {
    const role = await this.roleRepository.findOneBy({
      roleId: roleId,
    });
    if (!role) throw new NotFoundException('ROLE NOT FOUND');
    return role;
  }

  async getRolesByIds(roleIds: number[]): Promise<Role[]> {
    const roles = await this.roleRepository
      .createQueryBuilder('role')
      .where('role.roleId IN (:...rolesIds)', { rolesIds: [...roleIds] })
      .getMany();
    if (!roles.length) throw new NotFoundException('ROLES NOT FOUND');
    return roles;
  }

  async updateRole(roleId: number, updateRoleDto: UpdateRoleDto) {
    await this.getRoleById(roleId);
    try {
      await this.roleRepository.update(roleId, updateRoleDto);
      return { staus: HttpStatus.OK, message: 'ROLE UPDATED' };
    } catch (err) {
      throw new HttpException('SERVER ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteRole(roleId: number) {
    await this.getRoleById(roleId);
    try {
      await this.roleRepository.delete(roleId);
      return { staus: HttpStatus.OK, message: 'ROLE DELETED' };
    } catch (err) {
      throw new HttpException('SERVER ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

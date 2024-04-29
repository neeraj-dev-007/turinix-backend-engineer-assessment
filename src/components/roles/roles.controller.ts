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
  ROLES,
  ROLE_ID,
  ROLE_ID_ENDPOINT,
} from 'src/utils/constants/api-endpoints';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dtos/create-role.dto';
import { Role } from './role.entity';
import { UpdateRoleDto } from './dtos/update-role.dto';

@Controller(ROLES)
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.rolesService.createRole(createRoleDto);
  }

  @Get()
  async getAllRoles(): Promise<Role[]> {
    return this.rolesService.getAllRoles();
  }

  @Get(ROLE_ID_ENDPOINT)
  async getRoleById(@Param(ROLE_ID, ParseIntPipe) roleId: number) {
    try {
      return this.rolesService.getRoleById(roleId);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
    }
  }

  @Put(ROLE_ID_ENDPOINT)
  async updateRole(
    @Param(ROLE_ID, ParseIntPipe) roleId: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.rolesService.updateRole(roleId, updateRoleDto);
  }

  @Delete(ROLE_ID_ENDPOINT)
  async deleteRole(@Param(ROLE_ID, ParseIntPipe) roleId: number) {
    return this.rolesService.deleteRole(roleId);
  }
}

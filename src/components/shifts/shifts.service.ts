import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shift } from './shift.entity';
import { Repository } from 'typeorm';
import { CreateShiftDto } from './dtos/create-shift.dto';
import { DepartmentsService } from '../departments/departments.service';
import { RolesService } from '../roles/roles.service';
import { UpdateShiftDto } from './dtos/update-shift.dto';

@Injectable()
export class ShiftsService {
  constructor(
    @InjectRepository(Shift)
    private shiftRepository: Repository<Shift>,
    private departmentsService: DepartmentsService,
    private rolesService: RolesService,
  ) {}

  async createShift(createShiftDto: CreateShiftDto): Promise<Shift> {
    const shift = new Shift();
    shift.shift = createShiftDto.shift;
    shift.startTime = createShiftDto.startTime;
    shift.endTime = createShiftDto.endTime;
    if (!createShiftDto.startTime || !createShiftDto.endTime)
      throw new NotAcceptableException(
        'START TIME AND END TIME SHOULD BE PRESENT',
      );
    if (createShiftDto.startTime >= createShiftDto.endTime)
      throw new NotAcceptableException('START TIME SHOULD BE BEFORE END TIME');
    if (createShiftDto.departments != null) {
      const departments = await this.departmentsService.getDepartmentsByIds(
        createShiftDto.departments,
      );
      shift.departments = departments;
    } else {
      shift.departments = null;
    }
    if (createShiftDto.roles != null) {
      const roles = await this.rolesService.getRolesByIds(createShiftDto.roles);
      shift.roles = roles;
    } else {
      shift.roles = null;
    }

    try {
      return await this.shiftRepository.save(shift);
    } catch (err) {
      throw new HttpException('SERVER ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllShifs(): Promise<Shift[]> {
    try {
      return await this.shiftRepository.find();
    } catch (err) {
      throw new HttpException('SERVER ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getShiftById(shiftId: number): Promise<Shift> {
    const shift = await this.shiftRepository.findOneBy({ shiftId: shiftId });
    if (!shift) throw new NotFoundException('SHIFT NOT FOUND');
    return shift;
  }

  async updateShift(shiftId: number, updateShiftDto: UpdateShiftDto) {
    await this.getShiftById(shiftId);
    try {
      await this.shiftRepository.update(shiftId, updateShiftDto);
      return { staus: HttpStatus.OK, message: 'SHIFT UPDATED' };
    } catch (err) {
      throw new HttpException('SERVER ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteShift(shiftId: number) {
    await this.getShiftById(shiftId);
    try {
      await this.shiftRepository.delete(shiftId);
      return { staus: HttpStatus.OK, message: 'SHIFT DELETED' };
    } catch (err) {
      throw new HttpException('SERVER ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

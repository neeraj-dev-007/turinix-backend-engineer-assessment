import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../entities/employee.entity';
import { Repository } from 'typeorm';
import { DateEntity } from '../entities/date.entity';
import { Availability } from '../entities/availability.entity';
import { ShiftsService } from 'src/components/shifts/shifts.service';
import { AssignShiftDto } from '../dtos/assign-shift.dto';
import { Schedule } from '../entities/schedule.entity';

@Injectable()
export class EmployeesSchedulingService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(DateEntity)
    private dateRepository: Repository<DateEntity>,
    @InjectRepository(Availability)
    private availabilityRepository: Repository<Availability>,
    private shiftsService: ShiftsService,
  ) {}

  async assignShift(assignShiftDto: AssignShiftDto): Promise<Schedule> {
    const schedule = new Schedule();
    const employee = await this.employeeRepository.findOneBy(
      assignShiftDto.employee,
    );
    schedule.employee = employee;
    const date = await this.dateRepository.findOneBy(assignShiftDto.date);
    schedule.date = date;
    const shift = await this.shiftsService.getShiftById(assignShiftDto.shift);
    schedule.shift = shift;
    const availability = await this.availabilityRepository
      .createQueryBuilder('availability')
      .where('availability.employee = :employeeId', {
        employeeId: assignShiftDto.employee,
      })
      .andWhere('availability.date = :dateId', {
        dateId: assignShiftDto.date,
      })
      .getOne();

    if (!availability)
      throw new NotFoundException('EMPLOYEE HAS NOT FILLED AVAILABILITY');

    if (shift.roles && !shift.roles.includes(employee.role)) {
      throw new NotAcceptableException(
        "EMPLOYEE DOESN'T MEET THE SKILL REQUIREMENTS",
      );
    }

    if (
      !(
        availability.startTime < shift.startTime &&
        availability.endTime > shift.endTime
      )
    ) {
      throw new NotAcceptableException(
        "EMPLOYEE AVAILABILITY DOESN'T MATCH SHIFT TIMINGS",
      );
    }

    try {
      return await this.scheduleRepository.save(schedule);
    } catch (err) {
      throw new HttpException('SERVER ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getScheduleByEmployeeID(
    employeeId: number,
    startDate: number,
    endDate: number,
  ) {
    if (startDate > endDate)
      throw new BadRequestException('START DATE SHOULD BE LESS THAN END DATE');
    const employee = await this.employeeRepository.findOneBy({
      employeeId: employeeId,
    });
    if (!employee) throw new NotFoundException('EMPLOYEE NOT FOUND');
    try {
      return await this.scheduleRepository
        .createQueryBuilder('schedule')
        .where(
          'schedule.date >= :startDate AND schedule.date <= :endDate AND schedule.employee = :employeeId',
          { startDate: startDate, endDate: endDate, employeeId: employeeId },
        )
        .getMany();
    } catch (err) {
      throw new HttpException('SERVER ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getSchedules(startDate: number, endDate: number) {
    if (startDate > endDate)
      throw new BadRequestException('START DATE SHOULD BE LESS THAN END DATE');
    try {
      return await this.scheduleRepository
        .createQueryBuilder('schedules')
        .where('schedules.date >= :startDate AND schedules.date <= :endDate', {
          startDate: startDate,
          endDate: endDate,
        })
        .getMany();
    } catch (err) {
      throw new HttpException('SERVER ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

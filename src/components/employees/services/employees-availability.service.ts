import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Availability } from '../entities/availability.entity';
import { Repository } from 'typeorm';
import { CreateAvailabilityDto } from '../dtos/create-availability.dto';
import { DateEntity } from '../entities/date.entity';
import { Employee } from '../entities/employee.entity';

@Injectable()
export class EmployeesAvailabilityService {
  constructor(
    @InjectRepository(Availability)
    private availabilityRepository: Repository<Availability>,
    @InjectRepository(DateEntity)
    private dateRepository: Repository<DateEntity>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async createAvailability(
    createAvailabilityDto: CreateAvailabilityDto,
  ): Promise<Availability> {
    const availability = new Availability();
    if (createAvailabilityDto.startTime)
      availability.startTime = createAvailabilityDto.startTime;
    if (createAvailabilityDto.endTime)
      availability.endTime = createAvailabilityDto.endTime;
    if (!createAvailabilityDto.startTime || !createAvailabilityDto.endTime)
      throw new NotAcceptableException(
        'START TIME AND END TIME SHOULD BE PRESENT',
      );
    if (createAvailabilityDto.startTime >= createAvailabilityDto.endTime)
      throw new NotAcceptableException('START TIME SHOULD BE BEFORE END TIME');
    const employee = await this.employeeRepository.findOneBy(
      createAvailabilityDto.employee,
    );
    if (!employee) throw new NotFoundException('EMPLOYEE NOT FOUND');
    availability.employee = employee;
    const date = await this.dateRepository.findOneBy({
      dateId: createAvailabilityDto.date,
    });
    if (!date)
      throw new NotFoundException(
        'PLEASE MAKE SURE THAT DATE IS IN YYYYMMDD FORMAT. DATE NOT PRESENT IN THE VALID TIME PERIOD. PLEASE SELECT A DATE BETWEEN (20240429 - 20240531)',
      );
    availability.date = date;

    try {
      return await this.availabilityRepository.save(availability);
    } catch (err) {
      throw new HttpException('SERVER ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

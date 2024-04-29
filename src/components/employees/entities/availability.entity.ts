import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from './employee.entity';
import { DateEntity } from './date.entity';

@Entity('availabilities')
export class Availability {
  @PrimaryGeneratedColumn()
  availabilityId: number;

  @Column({ type: 'time', default: '00:00:00' })
  startTime: Date;

  @Column({ type: 'time', default: '24:00:00' })
  endTime: Date;

  @Column({ name: 'employeeId' })
  employeeId: number;

  @ManyToOne(() => Employee, (employee) => employee.availabilities, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'employeeId' })
  employee: Employee;

  @Column({ name: 'dateId' })
  dateId: number;

  @ManyToOne(() => DateEntity, (date) => date.availabilities, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dateId' })
  date: DateEntity;
}

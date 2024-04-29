import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from './employee.entity';
import { DateEntity } from './date.entity';
import { Shift } from 'src/components/shifts/shift.entity';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn()
  scheduleId: number;

  @Column({ name: 'employee' })
  employeeId: number;

  @ManyToOne(() => Employee, (employee) => employee.schedules, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'employee' })
  employee: Employee;

  @Column({ name: 'shift' })
  shiftId: number;

  @ManyToOne(() => Shift, (shift) => shift.schedules, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'shift' })
  shift: Shift;

  @Column({ name: 'date' })
  dateId: number;

  @ManyToOne(() => DateEntity, (date) => date.schedules, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'date' })
  date: DateEntity;
}

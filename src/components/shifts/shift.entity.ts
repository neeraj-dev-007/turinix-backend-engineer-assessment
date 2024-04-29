import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../roles/role.entity';
import { Department } from '../departments/department.entity';
import { Schedule } from '../employees/entities/schedule.entity';

@Entity('shifts')
export class Shift {
  @PrimaryGeneratedColumn()
  shiftId: number;

  @Column()
  shift: string;

  @Column({ type: 'time' })
  startTime: Date;

  @Column({ type: 'time' })
  endTime: Date;

  @Column({ type: 'date' })
  @CreateDateColumn()
  createDate: Date;

  @Column({ type: 'date' })
  @UpdateDateColumn()
  updateDate: Date;

  @ManyToMany(() => Role, (role) => role.shifts, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinTable({ name: 'shifts_roles' })
  roles: Role[];

  @ManyToMany(() => Department, (department) => department.shifts, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinTable({
    name: 'shifts_departments',
    joinColumn: {
      name: 'shiftId',
      referencedColumnName: 'shiftId',
      foreignKeyConstraintName: 'shifts_departments_shift_id',
    },
    inverseJoinColumn: {
      name: 'departmentId',
      referencedColumnName: 'departmentId',
      foreignKeyConstraintName: 'shifts_departments_department_id',
    },
  })
  departments: Department[];

  @OneToMany(() => Schedule, (schedule) => schedule.shift)
  schedules: Schedule[];
}

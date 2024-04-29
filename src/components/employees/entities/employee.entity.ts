import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Department } from '../../departments/department.entity';
import { Role } from '../../roles/role.entity';
import { Availability } from './availability.entity';
import { Schedule } from './schedule.entity';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  employeeId: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  mobile: string;

  @Column({ type: 'date' })
  @CreateDateColumn()
  createDate: Date;

  @Column({ type: 'date' })
  @UpdateDateColumn()
  updateDate: Date;

  @Column({ default: 40 })
  maxWorkingHours: number;

  @Column({ name: 'departmentId' })
  departmentId: number;

  @ManyToOne(() => Department, (department) => department.employees, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  @Column({ name: 'roleId' })
  roleId: number;

  @ManyToOne(() => Role, (role) => role.employees, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @OneToMany(() => Availability, (availability) => availability.employee)
  availabilities: Availability[];

  @OneToMany(() => Schedule, (schedule) => schedule.employee)
  schedules: Schedule[];
}

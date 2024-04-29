import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Employee } from '../employees/entities/employee.entity';
import { Department } from '../departments/department.entity';
import { Shift } from '../shifts/shift.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  roleId: number;

  @Column()
  role: string;

  @Column({ type: 'date' })
  @CreateDateColumn()
  createDate: Date;

  @Column({ type: 'date' })
  @UpdateDateColumn()
  updateDate: Date;

  @OneToMany(() => Employee, (employee) => employee.role)
  employees: Employee[];

  @Column({ name: 'departmentId' })
  departmentId: number;

  @ManyToOne(() => Department, (department) => department.roles, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  @ManyToMany(() => Shift, (shift) => shift.roles, {
    onDelete: 'SET NULL',
  })
  shifts: Shift[];
}

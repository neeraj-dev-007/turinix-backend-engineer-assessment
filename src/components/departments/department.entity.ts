import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Employee } from '../employees/entities/employee.entity';
import { Role } from '../roles/role.entity';
import { Shift } from '../shifts/shift.entity';

@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn()
  departmentId: number;

  @Column()
  department: string;

  @Column({ type: 'date' })
  @CreateDateColumn()
  createDate: Date;

  @Column({ type: 'date' })
  @UpdateDateColumn()
  updateDate: Date;

  @OneToMany(() => Employee, (employee) => employee.department)
  employees: Employee[];

  @OneToMany(() => Role, (role) => role.department)
  roles: Role[];

  @ManyToMany(() => Shift, (shift) => shift.departments, {
    onDelete: 'SET NULL',
  })
  shifts: Shift[];
}

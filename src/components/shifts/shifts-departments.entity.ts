import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shifts_departments')
export class ShiftDepartment {
  @PrimaryGeneratedColumn()
  shiftDepartmentId: number;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn()
  departmentId: number;

  @Column()
  department: string;

  @Column({ type: 'date' })
  createDate: Date;

  @Column({ type: 'date' })
  updateDate: Date;
}

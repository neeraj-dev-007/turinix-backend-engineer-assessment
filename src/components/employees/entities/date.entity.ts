import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Availability } from './availability.entity';
import { Schedule } from './schedule.entity';

@Entity('dates')
export class DateEntity {
  @PrimaryColumn({ name: 'id' })
  dateId: number;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  day: number;

  @Column({ nullable: true })
  week: number;

  @Column()
  month: number;

  @Column()
  year: number;

  @Column({ default: false })
  isHoliday: boolean;

  @Column({ default: false })
  isWeekend: boolean;

  @Column({ default: false })
  isBusy: boolean;

  @Column({ nullable: true })
  weekDay: number;

  @OneToMany(() => Availability, (availability) => availability.date)
  availabilities: Availability[];

  @OneToMany(() => Schedule, (schedule) => schedule.date)
  schedules: Schedule[];
}

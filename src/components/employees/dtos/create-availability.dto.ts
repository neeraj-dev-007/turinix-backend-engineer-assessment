import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAvailabilityDto {
  @IsNotEmpty()
  @IsNumber()
  readonly employee;

  @IsNotEmpty()
  @IsNumber()
  readonly date;

  @IsNotEmpty()
  readonly startTime;

  @IsNotEmpty()
  readonly endTime;
}

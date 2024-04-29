import { IsNotEmpty, IsNumber } from 'class-validator';

export class AssignShiftDto {
  @IsNotEmpty()
  @IsNumber()
  readonly employee;

  @IsNotEmpty()
  @IsNumber()
  readonly shift;

  @IsNotEmpty()
  @IsNumber()
  readonly date;
}

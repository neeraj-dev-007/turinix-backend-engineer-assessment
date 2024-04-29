import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateShiftDto {
  @IsString()
  @IsOptional()
  readonly shift;

  @IsOptional()
  @IsNumber()
  readonly departments;

  @IsOptional()
  @IsNumber()
  readonly roles;

  @IsDate()
  @IsOptional()
  readonly startTime;

  @IsDate()
  @IsOptional()
  readonly endTime;
}

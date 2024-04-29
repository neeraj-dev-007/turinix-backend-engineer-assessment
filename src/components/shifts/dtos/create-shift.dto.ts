import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateShiftDto {
  @IsString()
  @IsNotEmpty()
  readonly shift;

  @IsOptional()
  @IsNumber()
  readonly departments;

  @IsOptional()
  @IsNumber()
  readonly roles;

  @IsDate()
  @IsNotEmpty()
  readonly startTime;

  @IsDate()
  @IsNotEmpty()
  readonly endTime;
}

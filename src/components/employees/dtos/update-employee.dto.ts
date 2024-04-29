import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class UpdateEmployeeDto {
  @IsString()
  @IsOptional()
  readonly firstName;

  @IsString()
  @IsOptional()
  readonly lastName;

  @IsString()
  @IsEmail()
  @IsOptional()
  readonly email;

  @IsNumber()
  @IsOptional()
  readonly mobile;

  @IsOptional()
  @IsNumber()
  readonly role;

  @IsOptional()
  @IsNumber()
  readonly department;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(60)
  readonly maxWorkingHours: number;
}

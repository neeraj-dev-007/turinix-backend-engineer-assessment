import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName;

  @IsString()
  @IsNotEmpty()
  readonly lastName;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email;

  @IsNumber()
  @IsNotEmpty()
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
  readonly maxWorkingHours;
}

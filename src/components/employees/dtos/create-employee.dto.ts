import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName;

  @IsString()
  @IsNotEmpty()
  readonly lastName;

  
}

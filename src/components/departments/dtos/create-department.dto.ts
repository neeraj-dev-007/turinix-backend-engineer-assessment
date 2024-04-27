import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  readonly department;
}

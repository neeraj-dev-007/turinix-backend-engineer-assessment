import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  readonly department;
}

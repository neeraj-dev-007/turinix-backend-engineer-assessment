import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateRoleDto {
  @IsString()
  @IsOptional()
  readonly role;

  @IsNumber()
  @IsOptional()
  readonly department;
}

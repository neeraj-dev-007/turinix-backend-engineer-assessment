import { Controller } from '@nestjs/common';
import { ROLES } from 'src/utils/constants/api-endpoints';

@Controller(ROLES)
export class RolesController {}

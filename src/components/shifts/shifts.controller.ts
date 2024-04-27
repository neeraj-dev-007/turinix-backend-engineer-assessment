import { Controller } from '@nestjs/common';
import { SHIFTS } from 'src/utils/constants/api-endpoints';

@Controller(SHIFTS)
export class ShiftsController {}

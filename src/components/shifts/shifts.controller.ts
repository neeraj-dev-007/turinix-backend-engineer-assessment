import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  SHIFTS,
  SHIFT_ID,
  SHIFT_ID_ENDPOINT,
} from 'src/utils/constants/api-endpoints';
import { ShiftsService } from './shifts.service';
import { CreateShiftDto } from './dtos/create-shift.dto';
import { Shift } from './shift.entity';
import { UpdateShiftDto } from './dtos/update-shift.dto';

@Controller(SHIFTS)
export class ShiftsController {
  constructor(private shiftsService: ShiftsService) {}

  @Post()
  async createShift(@Body() createShiftDto: CreateShiftDto): Promise<Shift> {
    return this.shiftsService.createShift(createShiftDto);
  }

  @Get()
  async getAllShifts(): Promise<Shift[]> {
    return this.shiftsService.getAllShifs();
  }

  @Get(SHIFT_ID_ENDPOINT)
  async getShiftById(@Param(SHIFT_ID, ParseIntPipe) shiftId: number) {
    try {
      return this.shiftsService.getShiftById(shiftId);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
    }
  }

  @Put(SHIFT_ID_ENDPOINT)
  updateShift(
    @Param(SHIFT_ID, ParseIntPipe) shiftId: number,
    @Body() updateShiftDto: UpdateShiftDto,
  ) {
    return this.shiftsService.updateShift(shiftId, updateShiftDto);
  }

  @Delete(SHIFT_ID_ENDPOINT)
  deleteShift(@Param(SHIFT_ID, ParseIntPipe) shiftId: number) {
    return this.shiftsService.deleteShift(shiftId);
  }
}

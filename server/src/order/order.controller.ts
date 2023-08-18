import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order';
import { UpdateOrderDto } from './dto/update-order';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.orderService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() orderData: CreateOrderDto) {
    return this.orderService.create(orderData);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Put(':id')
  update(@Param('id') id: string, @Body() orderData: UpdateOrderDto) {
    return this.orderService.update(id, orderData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.orderService.delete(id);
  }
}

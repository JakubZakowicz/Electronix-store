import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order';
import { UpdateOrderDto } from './dto/update-order';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOneById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() orderData: CreateOrderDto) {
    return this.orderService.create(orderData);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() orderData: UpdateOrderDto,
  ) {
    return this.orderService.update(id, orderData);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.delete(id);
  }
}

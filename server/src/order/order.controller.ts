import {
  Body,
  CacheKey,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './services/order.service';
import { CreateOrderDto } from './dto/create-order';
import { UpdateOrderDto } from './dto/update-order';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  PaginationParams,
  Pagination,
} from '../decorators/pagination-params.decorator';
import { Sorting, SortingParams } from '../decorators/sorting-params.decorator';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @CacheKey('orders')
  @Get()
  findAll(
    @PaginationParams() paginationParams: Pagination,
    @SortingParams([
      'id',
      'paymentIntentId',
      'status',
      'deliveryPrice',
      'totalPrice',
      'created_at',
      'updated_at',
      'userId',
    ])
    sortingParams: Sorting,
  ) {
    return this.orderService.findAll(paginationParams, sortingParams);
  }

  @CacheKey('user:orders')
  @UseGuards(JwtAuthGuard)
  @Get('/user/:userId')
  findUserOrders(
    @PaginationParams() paginationParams: Pagination,
    @SortingParams() sortingParams: Sorting,
    @Param('userId') userId: string,
  ) {
    return this.orderService.findAll(paginationParams, sortingParams, userId);
  }

  @CacheKey('order')
  @UseGuards(JwtAuthGuard)
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

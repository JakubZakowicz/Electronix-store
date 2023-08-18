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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.productService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() productData: CreateProductDto) {
    return this.productService.create(productData);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Put(':id')
  update(@Param('id') id: string, @Body() productData: UpdateProductDto) {
    return this.productService.update(id, productData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}

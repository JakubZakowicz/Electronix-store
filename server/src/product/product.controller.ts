import {
  Body,
  CacheKey,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  Pagination,
  PaginationParams,
} from '../decorators/pagination-params.decorator';
import { Sorting, SortingParams } from '../decorators/sorting-params.decorator';
import {
  Filtering,
  FilteringParams,
} from '../decorators/filtering-params.decorator';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @CacheKey('products')
  @Get()
  findAll(
    @PaginationParams() paginationParams: Pagination,
    @SortingParams([
      'id',
      'name',
      'summary',
      'description',
      'isFeatured',
      'price',
      'rating',
      'slug',
      'created_at',
      'updated_at',
    ])
    sortingParams: Sorting,
    @FilteringParams(['name']) filteringParams: Filtering,
    @Query('category_id') categoryId: string,
  ) {
    return this.productService.findAll(
      paginationParams,
      sortingParams,
      filteringParams,
      categoryId,
    );
  }

  @CacheKey('product')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
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

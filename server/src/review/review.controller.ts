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
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  PaginationParams,
  Pagination,
} from '../decorators/pagination-params.decorator';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Sorting, SortingParams } from '../decorators/sorting-params.decorator';

interface RequestWithUser extends Express.Request {
  user: { userId: string };
}

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @CacheKey('reviews')
  @Get()
  findAll(
    @PaginationParams() paginationParams: Pagination,
    @SortingParams([
      'id',
      'title',
      'content',
      'rating',
      'created_at',
      'updated_at',
    ])
    sortingParams: Sorting,
    @Query('product_id') productId: string,
  ) {
    return this.reviewService.findAll(
      paginationParams,
      sortingParams,
      productId,
    );
  }

  @CacheKey('review')
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.reviewService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post(':productId')
  async create(
    @Param('productId') productId: string,
    @Body() reviewData: CreateReviewDto,
    @Req() req: RequestWithUser,
  ) {
    const { userId } = req.user;

    if (await this.reviewService.checkIfUserReviewed(userId, productId)) {
      throw new Error('User already reviewed this product');
    } else {
      return this.reviewService.create(userId, productId, reviewData);
    }
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Put(':reviewId')
  update(
    @Param('reviewId') reviewId: string,
    @Body() reviewData: UpdateReviewDto,
  ) {
    return this.reviewService.update(reviewId, reviewData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.reviewService.delete(id);
  }
}

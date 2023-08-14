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
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.reviewService.findOneById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() reviewData: CreateReviewDto) {
    return this.reviewService.create(reviewData);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() reviewData: UpdateReviewDto,
  ) {
    return this.reviewService.update(id, reviewData);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.reviewService.delete(id);
  }
}

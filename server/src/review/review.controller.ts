import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from 'src/user/user.entity';

interface RequestWithUser extends Express.Request {
  user: { userId: string };
}

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.reviewService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('/:productId')
  create(
    @Param('productId') productId: string,
    @Body() reviewData: CreateReviewDto,
    @Req() req: RequestWithUser,
  ) {
    const { userId } = req.user;
    return this.reviewService.create(userId, productId, reviewData);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Put(':id')
  update(@Param('id') id: string, @Body() reviewData: UpdateReviewDto) {
    return this.reviewService.update(id, reviewData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.reviewService.delete(id);
  }
}

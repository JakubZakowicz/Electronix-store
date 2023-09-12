import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async findAll() {
    return await this.reviewRepository.find();
  }

  async findOneById(id: string) {
    const review = await this.reviewRepository.findOneBy({ id });

    if (!review) {
      throw new NotFoundException(`There is no review with id: ${id}`);
    }

    return await review;
  }

  async create(userId: string, productId: string, reviewData: CreateReviewDto) {
    const newReview = this.reviewRepository.create(reviewData);
    return await this.reviewRepository.save(newReview);
  }

  async update(id: string, reviewData: UpdateReviewDto) {
    const review = await this.reviewRepository.preload({
      id,
      ...reviewData,
    });

    if (!review) {
      throw new NotFoundException(`There is no review with id: ${id}`);
    }

    return await this.reviewRepository.save(review);
  }

  async delete(id: string) {
    return await this.reviewRepository.delete(id);
  }
}

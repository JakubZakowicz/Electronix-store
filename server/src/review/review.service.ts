import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Product } from '../product/product.entity';
import { Pagination } from '../decorators/pagination-params.decorator';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(paginationParams: Pagination) {
    const { page, limit, size, offset } = paginationParams;

    const [reviews, total] = await this.reviewRepository.findAndCount({
      take: limit,
      skip: offset,
    });

    return {
      total,
      reviews,
      page,
      size,
    };
  }

  async findOneById(id: string) {
    const review = await this.reviewRepository.findOneBy({ id });

    if (!review) {
      throw new NotFoundException(`There is no review with id: ${id}`);
    }

    return await review;
  }

  async create(userId: string, productId: string, reviewData: CreateReviewDto) {
    const newReview = this.reviewRepository.create({
      user: { id: userId },
      product: { id: productId },
      ...reviewData,
    });

    this.calculateAverageRating(newReview.product.id);

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

    this.calculateAverageRating(review.product.id);

    return await this.reviewRepository.save(review);
  }

  async delete(id: string) {
    const deletedReview = await this.reviewRepository.findOne({
      where: { id },
      relations: { product: true },
    });

    const deleteResult = await this.reviewRepository.delete(id);

    if (deletedReview) this.calculateAverageRating(deletedReview?.product.id);

    return deleteResult;
  }

  async calculateAverageRating(productId: string) {
    const reviews = await this.reviewRepository.find({
      where: { product: { id: productId } },
    });

    let averageRating = 0;
    reviews.forEach((review) => {
      averageRating += review.rating;
    });

    averageRating = Number((averageRating / reviews.length).toFixed(2));

    await this.productRepository.save({ id: productId, rating: averageRating });

    return averageRating;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Pagination } from '../decorators/pagination-params.decorator';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(paginationParams: Pagination) {
    const { page, limit, size, offset } = paginationParams;

    const [products, total] = await this.productRepository.findAndCount({
      relations: { category: true, images: true },
      take: limit,
      skip: offset,
    });

    return {
      productCount: total,
      products,
      page,
      size,
    };
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: [{ id }, { name: id }, { slug: id }],
      relations: { reviews: { user: true }, images: true },
    });

    if (!product) {
      throw new NotFoundException(`There is no product with id: ${id}`);
    }

    return await product;
  }

  async create(productData: CreateProductDto) {
    const newProduct = this.productRepository.create(productData);
    return await this.productRepository.save(newProduct);
  }

  async update(id: string, productData: UpdateProductDto) {
    const product = await this.productRepository.preload({
      id,
      ...productData,
    });

    if (!product) {
      throw new NotFoundException(`There is no product with id: ${id}`);
    }

    return await this.productRepository.save(product);
  }

  async delete(id: string) {
    return await this.productRepository.delete(id);
  }
}

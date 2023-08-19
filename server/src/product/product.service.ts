import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll() {
    return await this.productRepository.find({ relations: { category: true } });
  }

  async findOneById(id: string) {
    const product = await this.productRepository.findOneBy({ id });

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

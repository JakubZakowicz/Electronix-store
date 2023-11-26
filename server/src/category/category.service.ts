import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Pagination } from '../decorators/pagination-params.decorator';
import { getPageCount } from '../utils/functions';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(paginationParams: Pagination) {
    const { page, limit, size, offset } = paginationParams;

    const [categories, total] = await this.categoryRepository.findAndCount({
      relations: { products: true },
      take: limit,
      skip: offset,
    });

    return {
      total,
      categories,
      page,
      size,
      pageCount: getPageCount(total, size),
    };
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOne({
      where: [{ id }, { name: id }, { slug: id }],
      relations: { products: { images: true } },
    });

    if (!category) {
      throw new NotFoundException(`There is no category with id: ${id}`);
    }

    return await category;
  }

  async create(categoryData: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create(categoryData);
    return await this.categoryRepository.save(newCategory);
  }

  async update(id: string, categoryData: UpdateCategoryDto) {
    const category = await this.categoryRepository.preload({
      id,
      ...categoryData,
    });

    if (!category) {
      throw new NotFoundException(`There is no category with id: ${id}`);
    }

    return await this.categoryRepository.save(category);
  }

  async delete(id: string) {
    return await this.categoryRepository.delete(id);
  }
}

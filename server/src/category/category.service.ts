import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOneById(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });

    if (!category) {
      throw new NotFoundException(`There is no category with id: ${id}`);
    }

    return await category;
  }

  async create(categoryData: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create(categoryData);
    return await this.categoryRepository.save(newCategory);
  }

  async update(id: number, categoryData: UpdateCategoryDto) {
    const category = await this.categoryRepository.preload({
      id,
      ...categoryData,
    });

    if (!category) {
      throw new NotFoundException(`There is no category with id: ${id}`);
    }

    return await this.categoryRepository.save(category);
  }

  async delete(id: number) {
    return await this.categoryRepository.delete(id);
  }
}

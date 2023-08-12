import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CategoryParams } from './category.inteface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepository.find();
  }

  findOneById(id: number) {
    return this.categoryRepository.findOneByOrFail({ id });
  }

  create(categoryDetails: CategoryParams) {
    const newCategory = this.categoryRepository.create(categoryDetails);
    return this.categoryRepository.save(newCategory);
  }

  update(id: number, updateCategoryDetails: CategoryParams) {
    return this.categoryRepository.update(id, updateCategoryDetails);
  }

  delete(id: number) {
    return this.categoryRepository.delete(id);
  }
}

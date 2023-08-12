import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../../typeorm/entities/Category';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoriesService: Repository<Category>,
  ) {}

  findCategories() {
    return this.categoriesService.find();
  }
}

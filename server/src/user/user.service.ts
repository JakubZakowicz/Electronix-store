import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Pagination } from '../decorators/pagination-params.decorator';
import { getPageCount } from '../utils/functions';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(paginationParams: Pagination) {
    const { page, limit, size, offset } = paginationParams;

    const [users, total] = await this.userRepository.findAndCount({
      take: limit,
      skip: offset,
    });

    return {
      total,
      users,
      page,
      size,
      pageCount: getPageCount(total, size),
    };
  }

  async findOneById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        country: true,
        city: true,
        streetAddress: true,
        postCode: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`There is no user with id: ${id}`);
    }

    return await user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    return await user;
  }

  async create(userData: CreateUserDto) {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  async update(id: string, userData: UpdateUserDto) {
    const user = await this.userRepository.preload({ id, ...userData });

    if (!user) {
      throw new NotFoundException(`There is no user with id: ${id}`);
    }

    return await this.userRepository.save(user);
  }

  async delete(id: string) {
    return await this.userRepository.delete(id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.userRepository.find();
  }

  async findOneById(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`There is no user with id: ${id}`);
    }

    return await user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException(`There is no user with email: ${email}`);
    }

    return await user;
  }

  async create(userData: CreateUserDto) {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  async update(id: number, userData: UpdateUserDto) {
    const user = await this.userRepository.preload({ id, ...userData });

    if (!user) {
      throw new NotFoundException(`There is no user with id: ${id}`);
    }

    return await this.userRepository.save(user);
  }

  async delete(id: number) {
    return await this.userRepository.delete(id);
  }
}

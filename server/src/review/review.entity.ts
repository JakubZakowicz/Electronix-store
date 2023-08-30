import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'decimal', precision: 10, scale: 1, default: 0 })
  rating: number;

  @ManyToOne(() => User, (user: User) => user.reviews)
  user: User;

  @ManyToOne(() => Product, (product: Product) => product.reviews)
  product: Product;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

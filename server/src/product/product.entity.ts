import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { Review } from '../review/review.entity';
import { Order } from '../order/order.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  summary: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @ManyToOne(() => Category, (category: Category) => category.products)
  category: Category;

  @OneToMany(() => Review, (review: Review) => review.product)
  reviews: Review[];

  @ManyToMany(() => Order, (order: Order) => order.products)
  orders: Order[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

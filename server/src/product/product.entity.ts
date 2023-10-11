import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { Review } from '../review/review.entity';
import { OrderItem } from '../order/order-item.entity';
import { Image } from '../image/image.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Image, (image: Image) => image.product)
  images: Image[];

  @Column()
  name: string;

  @Column({ type: 'text' })
  summary: string;

  @Column({ type: 'longtext' })
  description: string;

  @Column()
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 1, default: 0 })
  rating: number;

  @Column()
  slug: string;

  @ManyToOne(() => Category, (category: Category) => category.products)
  category: Category;

  @OneToMany(() => Review, (review: Review) => review.product)
  reviews: Review[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

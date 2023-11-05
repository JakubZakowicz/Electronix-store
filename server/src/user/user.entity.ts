import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from '../order/entities/order.entity';
import { Review } from '../review/review.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '' })
  firstName: string;

  @Column({ default: '' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: '' })
  phoneNumber: string;

  @Column({ default: '' })
  country: string;

  @Column({ default: '' })
  city: string;

  @Column({ default: '' })
  streetAddress: string;

  @Column({ default: '' })
  postCode: string;

  @Column()
  password: string;

  @OneToMany(() => Review, (review: Review) => review.user)
  reviews: Review[];

  @OneToMany(() => Order, (order: Order) => order.user)
  orders: Order[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  deliveryPrice: number;

  @Column()
  totalPrice: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

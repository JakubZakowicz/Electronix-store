import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  readonly status: string;

  @IsNotEmpty()
  @IsPositive()
  readonly deliveryPrice: number;

  @IsNotEmpty()
  @IsPositive()
  readonly totalPrice: number;
}

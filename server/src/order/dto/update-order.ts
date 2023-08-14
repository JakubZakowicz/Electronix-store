import { IsNotEmpty, IsPositive } from 'class-validator';

export class UpdateOrderDto {
  @IsNotEmpty()
  readonly status: string;

  @IsNotEmpty()
  @IsPositive()
  readonly deliveryPrice: number;

  @IsNotEmpty()
  @IsPositive()
  readonly totalPrice: number;
}

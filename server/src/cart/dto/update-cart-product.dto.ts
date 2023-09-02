import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class UpdateCartProductDto {
  @IsNotEmpty()
  readonly productId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  readonly quantity: number = 1;
}

import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  readonly name: string;

  readonly summary: string;
  readonly description: string;

  @IsNotEmpty()
  readonly price: number;
}

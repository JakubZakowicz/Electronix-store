import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly slug: string;

  readonly summary: string;
  readonly description: string;

  @IsNotEmpty()
  readonly price: number;
}

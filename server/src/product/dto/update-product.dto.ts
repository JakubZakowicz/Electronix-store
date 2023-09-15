import { IsNotEmpty } from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly slug: string;

  readonly summary: string;
  readonly description: string;
  readonly rating: number;

  @IsNotEmpty()
  readonly price: number;
}

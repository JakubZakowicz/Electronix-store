import { IsNotEmpty } from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty()
  readonly name: string;

  readonly summary: string;
  readonly description: string;

  @IsNotEmpty()
  readonly price: number;
}

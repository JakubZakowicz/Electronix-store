import { IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly slug: string;
}

import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  @IsPositive()
  rate: number;
}

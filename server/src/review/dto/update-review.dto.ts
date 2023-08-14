import { IsNotEmpty, IsPositive } from 'class-validator';

export class UpdateReviewDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  @IsPositive()
  rate: number;
}

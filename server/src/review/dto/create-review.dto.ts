import { IsNotEmpty, IsPositive, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  @Max(5)
  rating: number;
}

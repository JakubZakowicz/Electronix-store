import { IsEmail } from 'class-validator';

export class CreateUserDto {
  readonly firstName: string;
  readonly lastName: string;

  @IsEmail()
  readonly email: string;

  readonly phoneNumber: string;
  readonly country: string;
  readonly city: string;
  readonly streetAddress: string;
  readonly postCode: string;
}

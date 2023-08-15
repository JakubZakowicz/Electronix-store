import { IsEmail } from 'class-validator';

export class SignUp {
  @IsEmail()
  email: string;
  password: string;
}

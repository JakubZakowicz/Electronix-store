import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(signInData: SignInDto) {
    const { email, password } = signInData;

    console.log('validate');

    const user = await this.userService.findOneByEmail(email);

    console.log(email);

    if (user && user?.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async signIn(user: User) {
    console.log('user');
    const payload = { sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

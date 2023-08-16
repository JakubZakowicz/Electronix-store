import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);

    if (user && user?.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async signIn(user: User) {
    const payload = { sub: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(email: string, password: string) {
    const userExists = !!(await this.userService.findOneByEmail(email));

    if (userExists) {
      throw new BadRequestException('Email already exists!');
    } else {
      return this.userService.create({
        email,
        password,
        firstName: '',
        lastName: '',
        phoneNumber: '',
        country: '',
        city: '',
        streetAddress: '',
        postCode: '',
      });
    }
  }
}

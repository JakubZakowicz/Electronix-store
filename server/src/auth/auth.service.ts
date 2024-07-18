import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UserService } from '../user/user.service';
import { User } from 'src/user/user.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);

    if (user) {
      const passwordEquals = await argon2.verify(user.password, password);
      if (passwordEquals) {
        const { password, ...result } = user;
        return result;
      }
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
      const hashedPassword = await argon2.hash(password);

      this.userService.create({
        email,
        password: hashedPassword,
      });

      return this.sendVerificationEmail(email);
    }
  }

  async sendVerificationEmail(email: string) {
    try {
      const token = await this.jwtService.signAsync(
        { user: 'id' },
        {
          secret: this.configService.get('JWT_SECRET'),
          expiresIn: '1d',
        },
      );

      const url = `http://localhost:3000/confirmation/${token}`;

      await this.mailerService.sendMail({
        to: email,
        subject: 'Confirm Email',
        html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`,
      });
      return {
        message:
          'New account is created and verification email is sent successfully',
      };
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw new Error('Failed to send verification email');
    }
  }
}

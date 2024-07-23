import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
    try {
      const userExists = !!(await this.userService.findOneByEmail(email));

      if (userExists) {
        throw new BadRequestException('Email already exists!');
      }

      const hashedPassword = await argon2.hash(password);

      const newUser = await this.userService.create({
        email,
        password: hashedPassword,
      });

      const verificationResult = await this.sendVerificationEmail(
        newUser.id,
        email,
      );

      return {
        message: 'User created successfully',
        verificationStatus: verificationResult.message,
      };
    } catch (error) {
      console.error('Error during sign up:', error);
      throw new InternalServerErrorException(
        'An error occurred during sign up',
      );
    }
  }

  private async sendVerificationEmail(id: string, email: string) {
    try {
      const token = await this.jwtService.signAsync(
        { userId: id },
        {
          secret: this.configService.get('JWT_SECRET'),
          expiresIn: '1d',
        },
      );

      const url = `${this.configService.get(
        'CORS_ORIGIN',
      )}/email-confirmation/${token}`;

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

  async verifyEmail(token: string) {
    try {
      const { userId } = await this.jwtService.verifyAsync(
        token,
        this.configService.get('JWT_SECRET'),
      );

      const user = await this.userService.findOneById(userId);

      if (!user) {
        throw new NotFoundException(`User not found!`);
      }

      if (user.isConfirmed) {
        return {
          message: 'Email address is already confirmed!',
        };
      }

      await this.userService.update(userId, { isConfirmed: true });

      return { message: 'Email confirmed successfully' };
    } catch (error) {
      this.handleVerificationError(error);
    }
  }

  private handleVerificationError(error: any) {
    console.log('Error verifying email', error);

    if (
      error instanceof BadRequestException ||
      error instanceof NotFoundException
    ) {
      throw error;
    }

    if (error.name === 'JsonWebTokenError') {
      throw new UnauthorizedException('Invalid token');
    }

    if (error.name === 'TokenExpiredError') {
      throw new UnauthorizedException('Token has expired');
    }

    throw new InternalServerErrorException('Failed to verify email');
  }
}

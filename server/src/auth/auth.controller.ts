import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { User } from 'src/user/user.entity';
import { AuthGuard } from './auth.guard';

interface RequestWithUser extends Express.Request {
  user: User;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  signIn(@Body() signInData: SignInDto) {
    return this.authService.signIn(signInData);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Request() req: RequestWithUser) {
    return req.user;
  }
}

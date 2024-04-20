import {
  Body,
  Controller,
  Post,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignupDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body: SignupDto) {
    return this.authService.signUp(body.email, body.password);
  }

  @Post('signin')
  async signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body.email, body.password);
  }

  @Delete('signout/:userId')
  async signOut(@Param('userId', ParseIntPipe) userId: number) {
    await this.authService.signOut(userId);
    return { message: 'Logout Successfully' };
  }
}

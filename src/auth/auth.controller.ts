import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignupDto } from './dto/auth.dto';
import { AuthGuard } from './auth.guard';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  async signUp(@Body() body: SignupDto) {
    return this.authService.signUp(body.email, body.password);
  }

  @Public()
  @Post('signin')
  async signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body.email, body.password);
  }

  @Delete('signout/:userId')
  async signOut(@Param('userId', ParseIntPipe) userId: number) {
    await this.authService.signOut(userId);
    return { message: 'Logout Successfully' };
  }

  @UseGuards(AuthGuard)
  @Get('profile/:userId')
  getProfile(@Param('userId', ParseIntPipe) userId: number) {
    return this.authService.profile(userId);
  }
}

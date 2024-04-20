import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const existedUser = await this.prisma.user.findUnique({ where: { email } });
    if (existedUser) {
      throw new HttpException(
        {
          success: false,
          error: 'Email already exists',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const payload = { sub: email, password: hashedPassword };
    const accessToken = this.jwtService.sign(payload);

    await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        accessToken: accessToken,
      },
    });
    // const accessToken = this.jwtService.sign({ sub: user.id });
    return { accessToken };
  }

  async signIn(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new HttpException(
        {
          success: false,
          error: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new HttpException(
        {
          success: false,
          error: 'Invalid password',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = { sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { accessToken },
    });

    return { name: user.name, email: user.email, accessToken: accessToken };
  }

  async signOut(userId: number): Promise<void> {
    if (!userId) {
      throw new HttpException(
        {
          success: false,
          error: 'User not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null, accessToken: null },
    });
  }
}

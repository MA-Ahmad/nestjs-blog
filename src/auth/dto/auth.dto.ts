import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @Length(6, 20)
  password: string;
}

export class SignupDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @Length(6, 20)
  password: string;
}

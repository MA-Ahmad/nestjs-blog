import { IsString, IsNotEmpty } from 'class-validator';

export class PostDto {
  @IsString()
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Content cannot be empty' })
  content: string;
}

import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class PostDto {
  @IsString()
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Content cannot be empty' })
  content: string;
}

export class CreatePostDto {
  @IsString()
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Content cannot be empty' })
  content: string;

  @IsInt()
  @IsNotEmpty({ message: 'Author ID cannot be empty' })
  authorId: number;
}

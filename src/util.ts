import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreateUrlDto {
  @IsNotEmpty()
  @IsString()
  url: string;

  @IsString()
  password?: string;

  @IsDate()
  expiration?: Date;
}
  
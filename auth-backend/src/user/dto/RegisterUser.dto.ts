import { IsNotEmpty } from 'class-validator';

export class RegisterUserDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

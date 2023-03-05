import { Controller, Post, Body } from '@nestjs/common';
import { RegisterUserDTO } from './dto/RegisterUser.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() body: RegisterUserDTO) {
    return await this.userService.register(body);
  }
}

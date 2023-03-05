import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterUserDTO } from './dto/RegisterUser.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
      userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<User | null> {
      return this.prisma.user.findUnique({
          where: userWhereUniqueInput,
      });
  }

  async register(data: RegisterUserDTO) {
    const { password, username } = data;
    if(await this.user({username})){
        throw new BadRequestException("username already in use");
    }

    const salt = await bcrypt.genSalt();
    const password_hash = await bcrypt.hash(password, salt);
    return await this.prisma.user.create({ data: { username, password_hash, salt } });
  }

}

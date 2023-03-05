import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthorizeDTO } from './dto/Authorize.dto';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get('authorize')
    async authorize(@Query() dto: AuthorizeDTO){
        return this.authService.authorize(dto);
    }
}

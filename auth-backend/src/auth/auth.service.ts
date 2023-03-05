import { BadRequestException, Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthorizeDTO, AuthorizeReponseType } from './dto/Authorize.dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async authorize(dto: AuthorizeDTO) {
        switch (dto.response_type) {
            case AuthorizeReponseType.CODE:
                return await this.authorizeCodeFlow(dto);

            default:
        }

    }

    private async authorizeCodeFlow(dto:AuthorizeDTO){
        const {client_id, code_challenge_method, code_challenge, redirect_uri, scope} = dto;
        const appReg = await this.prisma.appRegisteration.findUnique({where: {client_id}});
        if(!appReg) throw new BadRequestException("client_id not valid");

        // TODO: add in appRegisteration a authorized scopes and redirect uris, and validate

        const buf = randomBytes(43);
        const auth_code = buf.toString('base64url');

        const saveInRedis = {
            auth_code, //This should be the redis key
            code_challenge,
            code_challenge_method,
            scope,
            client_id,

        }
        // TODO: save code challenge in redis for 1 min

        return {redirect_uri: `${redirect_uri}?auth_code=${auth_code}`};
    }

}

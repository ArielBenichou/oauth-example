import { IsEnum, IsNotEmpty } from "class-validator";

export enum AuthorizeReponseType {
    CODE = "code"
}

export enum CodeChallengeMethod {
    BCRYPT = 'bcrypt'
}

export class AuthorizeDTO {
    @IsNotEmpty()
    @IsEnum(AuthorizeReponseType)
    response_type: AuthorizeReponseType;

    @IsNotEmpty()
    client_id: string;

    @IsNotEmpty()
    redirect_uri: string;

    @IsNotEmpty()
    scope: string;

    @IsNotEmpty()
    state: string;

    @IsNotEmpty()
    code_challenge: string;

    @IsNotEmpty()
    @IsEnum(CodeChallengeMethod)
    code_challenge_method: CodeChallengeMethod;

}

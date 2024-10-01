import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export class JWTToken {

    token: string;

    constructor(token: string) {
        this.token = token;
    }
}

export const InjectToken = createParamDecorator(
	(_data: unknown, ctx: ExecutionContext) => {
		const response = ctx.switchToHttp().getResponse();
		return response.locals.token;
	},
);
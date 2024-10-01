import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TokenMiddleware implements NestMiddleware {

    constructor(private readonly userService: UserService) { }

    async use(req: Request, res: Response, next: NextFunction): Promise<void> {

        const authHeader = req.header('Authorization');
        if (!authHeader) {
            throw new HttpException(
                'No authorization header',
                HttpStatus.UNAUTHORIZED,
            );
        }

        try {
            const token = await this.userService.verifyToken(authHeader);
			
			res.locals.token = token;
        } catch (e) {
            throw new HttpException('Token invalid', HttpStatus.UNAUTHORIZED);
        }

        next();
    }
}
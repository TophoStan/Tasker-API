import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LogMiddleware implements NestMiddleware {

    async use(req: Request, res: Response, next: () => void): Promise<void> {
        // Log the user activity
        console.log('User requested the following URL:', req.originalUrl);

        next();
    }
}
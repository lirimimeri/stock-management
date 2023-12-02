import { Inject, NestMiddleware, UnauthorizedException } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthMiddleWare implements NestMiddleware {
    constructor(@Inject(AuthService) private readonly authService: AuthService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        console.log('here!');
        if (!req.headers.authorization)
            throw new UnauthorizedException({ msg: 'Unauthorized!'});

        const [, token] = req.headers.authorization.split(' ');
        const decodedToken = await this.authService.validateToken(token);
        if (!decodedToken) {
            throw new UnauthorizedException({ msg: 'Unauthorized!'});
        }
        req.session = decodedToken;
        next();
    }
    
}
import { Injectable, NestMiddleware } from '@nestjs/common';
import { type User } from '@prisma/client';
import { type NextFunction, type Request, type Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UserService } from '../user.service';

type RequestWithUser = Request & { user: null | User };

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: RequestWithUser, _: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      return next();
    }

    const [, token] = req.headers.authorization.split(' ');
    try {
      const decoded = verify(token, process.env.JWT_SECRET!) as {
        id: string;
      };
      const user = await this.userService.findUserById(decoded.id);
      req.user = user;
      next();
    } catch (error) {
      req.user = null;
      next();
    }
  }
}

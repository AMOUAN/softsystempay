import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction,Request,Response } from 'express';

@Injectable()
export class PaiementMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next:NextFunction) {
    if (req.method === 'POST') {

    } else if (req.method === 'GET'){
      return res.status(HttpStatus.NOT_FOUND).json({ Reponse: 'La méthode HTTP doit être POST.' });

    }

    next();
  }
}

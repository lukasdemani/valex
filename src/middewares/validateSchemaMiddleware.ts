import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

export function validateSchemaMiddleware(schema: joi.ObjectSchema) {

    return (req: Request, res: Response, next: NextFunction) => {
      const validation = schema.validate(req.body);
      if (validation.error) {
        return res.status(422).send(validation.error.details[0].message);
      }
  
      next();
    };
  }
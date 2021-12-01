import { NextFunction, Request, Response } from 'express';

type Route = {
  params?: string[],
  method: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head',
  authorization?: (req: Request, res: Response, next: NextFunction) => Promise<NextFunction | Response> | NextFunction | Response | void,
  execute: (req: Request, res: Response) => Promise<Response> | Response
}

export default Route
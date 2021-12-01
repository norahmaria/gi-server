import type { Request, Response, NextFunction } from 'express'
import env from '../env/env'
import jwt from 'jsonwebtoken'

const authorization = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies

  try {
    // @ts-expect-error
    const { userId } = jwt.verify(token, env.SECRET)

    res.locals.userId = userId
    next()
  } catch (error) {
    return res.sendStatus(403)
  }
} 

export default authorization
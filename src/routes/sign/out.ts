import type Route from '../../types/Route'
import authorization from '../../middlewares/http'
import env from '../../env/env'

// TODO: Fix Sign Out

const route: Route = {
  method: 'get',
  authorization,
  execute: async (req, res) => {
    try {
      // return res.clearCookie('token').sendStatus(200)
      return res.status(200).cookie('token', null, {
        expires: new Date(Date.now() + 500),
        secure: env.ENVIRONMENT === 'LIVE',
        sameSite: env.ENVIRONMENT === 'LIVE' ? 'none' : 'lax',
        httpOnly: true
      })
    } catch (error) {
      console.log('@sign/out', error)
      return res.status(500)
    }
  }
}

export default route
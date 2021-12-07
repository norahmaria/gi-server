import type Route from '../../types/Route'
import authorization from '../../middlewares/http'
import env from '../../env/env'

// TODO: Fix Sign Out

const route: Route = {
  method: 'get',
  authorization,
  execute: async (req, res) => {
    try {
      req.session.destroy(error => console.log('@session', error))
      return res.clearCookie('token', {
        secure: env.ENVIRONMENT === 'LIVE',
        sameSite: env.ENVIRONMENT === 'LIVE' ? 'none' : 'lax',
        httpOnly: true 
      })
      // return res.clearCookie('token').sendStatus(200)
    } catch (error) {
      console.log('@sign/out', error)
      return res.status(500)
    }
  }
}

export default route
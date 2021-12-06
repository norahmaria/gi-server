import type Route from '../../types/Route'
import authorization from '../../middlewares/http'

// TODO: Fix Sign Out

const route: Route = {
  method: 'get',
  authorization,
  execute: async (req, res) => {
    try {
      return res.clearCookie('token').sendStatus(200)
    } catch (error) {
      console.log('@sign/out', error)
      return res.status(500)
    }
  }
}

export default route
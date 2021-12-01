import type Route from '../../types/Route'
import authorization from '../../middlewares/http'

const route: Route = {
  method: 'get',
  authorization,
  execute: async (req, res) => {
    return res.clearCookie('token').sendStatus(200)
  }
}

export default route
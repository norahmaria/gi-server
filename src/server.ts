import createApp from './config/createApp'
import createRoutes from './config/createRoutes'
import createSockets from './config/createSockets'
import connectMongo from './config/connectMongo'

import env from './env/env'
import http from 'http'
import cors from './env/cors'

const launch = async () => {
  await connectMongo()
    .then(() => console.log('๐ MongoDB Connected')) 

  const app = createApp(cors)
  const server = http.createServer(app)

  await createSockets(server, cors, env.ENVIRONMENT === 'LIVE' ? './build/sockets' : './src/sockets', 'sockets')
    .then(() => console.log('๐งจ Sockets Lit Up'))

  await createRoutes(env.ENVIRONMENT === 'LIVE' ? './build/routes' : './src/routes', app, 'routes')
    .then(() => console.log('๐  Paths Created'))

  app.get('/', (req, res) => {
    res.send({ greeting: 'Hello World' })
  })

  server.listen(process.env.PORT || 5005, () => console.log('๐ Server Up'))
}

launch()
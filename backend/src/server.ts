import { app as server } from './app'
import { env } from './configs/env'

server
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => console.log(`Server running at 0.0.0.0:${env.PORT}`))

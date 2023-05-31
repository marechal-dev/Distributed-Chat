import { fastify } from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifySocketIO from 'fastify-socket.io'

import { globalHttpErrorHandler } from './globals/globalHttpErrorHandler'
import { newGlobalMessageSchemaValidator } from './events/validators/new-global-message-schema-validator'
import { appRoutes } from './routes'

const userMap = new Map<string, string>()
const typingUsersSet = new Set<string>()

export const app = fastify()
app.register(fastifyCors, {
  origin: '*',
  optionsSuccessStatus: 200,
})
app.register(fastifySocketIO, {
  transports: ['websocket'],
})
app.register(appRoutes)

app.setErrorHandler(globalHttpErrorHandler)

app.ready().then(() => {
  app.io.on('connection', (socket) => {
    socket.on('global.user.typing', () => {
      const typingUserUsername = userMap.get(socket.id)
      typingUsersSet.add(socket.id)

      if (typingUsersSet.size > 0) {
        app.io.emit('global.user.typing', 'Muita gente está digitando...')
        return
      }

      if (!typingUserUsername) {
        app.io.emit('global.user.typing', 'Um usuário está digitando...')
        return
      }

      app.io.emit('global.user.typing', `${typingUserUsername} está digitando`)
    })

    socket.on('global.user.typing', () => {
      typingUsersSet.delete(socket.id)
    })

    socket.on('global.message.new', (payload: any) => {
      const messagePayload = newGlobalMessageSchemaValidator.parse(payload)

      app.io.emit('message', messagePayload)
    })

    socket.on('disconnect', (_) => {
      const disconnectedUserUsername = userMap.get(socket.id)
      userMap.delete(socket.id)

      if (!disconnectedUserUsername) {
        app.io.emit('global.disconnection', 'Um usuário se desconectou')
        return
      }

      app.io.emit(
        'global.disconnection',
        `${disconnectedUserUsername} se desconectou`,
      )
    })
  })
})

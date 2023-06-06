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
    socket.on('global.users.typing', () => {
      const typingUserUsername = userMap.get(socket.id)

      if (!typingUsersSet.has(socket.id)) {
        typingUsersSet.add(socket.id)
      }

      if (typingUsersSet.size > 1) {
        app.io.emit('global.users.typing', 'Muita gente está digitando...')
        return
      }

      if (!typingUserUsername) {
        app.io.emit('global.users.typing', 'Um usuário está digitando...')
        return
      }

      app.io.emit(
        'global.users.typing',
        `${typingUserUsername} está digitando...`,
      )
    })

    socket.on('global.user.stop.typing', () => {
      typingUsersSet.delete(socket.id)

      if (typingUsersSet.size === 0) {
        app.io.emit('global.users.typing', '')
      }
    })

    socket.on('global.message.new', (payload: any) => {
      const messagePayload = newGlobalMessageSchemaValidator.parse(payload)

      if (!userMap.has(socket.id)) {
        userMap.set(socket.id, messagePayload.nickname)
      }

      app.io.emit('global.message.new', messagePayload)
    })

    socket.on('disconnect', (_) => {
      const disconnectedUserUsername = userMap.get(socket.id)
      userMap.delete(socket.id)
      typingUsersSet.delete(socket.id)

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

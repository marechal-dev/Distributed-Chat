import { fastify } from 'fastify'
import { socketioServer as socketServer } from 'fastify-socket.io'

import { newGlobalMessageSchemaValidator } from './events/validators/new-global-message-schema-validator'

export const app = fastify()
app.register(socketServer, {
  transports: ['websocket'],
})

app.ready().then(() => {
  app.io.on('connection', (socket) => {
    console.log('User connected', socket.id)

    socket.on('global.message.new', (payload: any) => {
      const messagePayload = newGlobalMessageSchemaValidator.parse(payload)

      app.io.emit('message', messagePayload)
    })

    socket.on('disconnect', (_) => {
      console.log('User disconnected')
    })
  })
})

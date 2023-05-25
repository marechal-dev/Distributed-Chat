import { env } from '@/configs/env'
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'

export function globalHttpErrorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Erro de validação de dados',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV === 'development') {
    console.log('Caught unexpected error 👇')
    console.error(error)
  }

  return reply.status(500).send({
    message: 'Internal Server Error',
  })
}
